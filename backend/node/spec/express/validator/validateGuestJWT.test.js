import assert from "assert";
import {describe, it} from "mocha";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import validateGuestJWT from "../../../express/validator/validateGuestJWT.js";
import guestJWTCookie from "../../../express/JWTCookie/guestJWTCookie.js";
import GuestFixtures from "../../fixtures/GuestFixtures.js";
import EventFixtures from "../../fixtures/EventFixtures.js";

describe(`express validator validateGuestJWT`, () => {
	new SequelizeTestHelper().autoSetup();
	const cookieKey = CookieKeys.GUEST_APP;

	it("should be able to fail on jwtCookies not found", async () => {
		// given
		const req = {};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "JWTCookieError");
		assert.equal(error.message, `jwtCookies not found in request object`);
	});

	it("should be able to fail on parse guest jwt", async () => {
		// given
		const req = {jwtCookies: {}};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "JWTCookieError");
		assert.equal(
			error.message,
			`jwt of cookie key '${CookieKeys.GUEST_APP}' not found`,
		);
	});

	it("should be able to fail on verify guest jwt with invalid jwt", async () => {
		// given
		const req = {jwtCookies: {[cookieKey]: "invalid jwt"}};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "JsonWebTokenError");
		assert.equal(error.message, `jwt malformed`);
	});

	it("should be able to fail on verify event with not exist event", async () => {
		// create guest
		const guest = await GuestFixtures.guest();
		const guestSid = guest.guestSid;

		// create jwt
		const payload = {guestSid};
		const token = guestJWTCookie.sign(payload);

		// given
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "ValidationError");
		assert.equal(error.message, `존재하지 않는 이벤트`);
	});

	it("should be able to fail on verify event with not active event", async () => {
		// given
		// create event
		const event = await EventFixtures.closedEvent();
		const guest = await GuestFixtures.guest(event);
		const guestSid = guest.guestSid;

		// create jwt
		const payload = {guestSid};
		const token = guestJWTCookie.sign(payload);

		// given
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "ValidationError");
		assert.equal(error.message, `이벤트 만료기간이 지났습니다.`);
	});

	//
	it("should be able to fail on verify guest is not exist", async () => {
		// given
		// create guest
		const guestSid = "invalid guest sid";

		// create jwt
		const payload = {guestSid};
		const token = guestJWTCookie.sign(payload);

		// given
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "ValidationError");
		assert.equal(error.message, `존재하지 않는 guest`);
	});

	it("should be able to pass", async () => {
		// given
		// create event
		const event = await EventFixtures.activeEvent();

		// create guest
		const guest = await GuestFixtures.guest(event);
		const guestSid = guest.guestSid;

		// create jwt
		const payload = {guestSid};
		const token = guestJWTCookie.sign(payload);

		// given
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, result] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, true);
		assert.deepStrictEqual(result, {event, guest});
	});
});
