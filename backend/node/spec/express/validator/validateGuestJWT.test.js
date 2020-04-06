import assert from "assert";
import moment from "moment";
import {after, afterEach, before, describe, it} from "mocha";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {findOrCreateEvent} from "../../../DB/queries/event.js";
import validateGuestJWT from "../../../express/validator/validateGuestJWT.js";
import {createGuest} from "../../../DB/queries/guest.js";
import guestJWTCookie from "../../../express/JWTCookie/guestJWTCookie.js";


let stampCounter = 0;

function getStamp() {
	return stampCounter++;
}

async function createEventMock({HostId = null, stamp = getStamp(), endAt = new Date()} = {}) {
	const eventCode = `event code${stamp}`;
	const eventName = ` event name${stamp}`;

	return findOrCreateEvent({eventCode, HostId, eventName, endAt});
}

describe(`express validator validateGuestJWT`, () => {
	const cookieKey = CookieKeys.GUEST_APP;
	const sequelizeMock = new SequelizeTestHelper();

	before(async () => {
		await Promise.all([sequelizeMock.setup()]);
	});

	after(async () => {
		await Promise.all([sequelizeMock.teardown()]);
	});

	afterEach(async () => {
		await sequelizeMock.dropAllAfterEach();
	});


	it("should be able to fail on jwtCookies not found", async () => {
		// given
		const req = {};

		// when
		const [isValid, error] = await validateGuestJWT(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "Error");
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
		assert.equal(error.message, `jwt of cookie key '${CookieKeys.GUEST_APP}' not found`);
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
		const guest = await createGuest(null);
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
		const endAt = moment().add(-4, "h")
			.toDate();
		const event = await createEventMock({endAt});
		const eventId = event.id;

		// create guest
		const guest = await createGuest(eventId);
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
		const endAt = moment().add(4, "h")
			.toDate();
		const event = await createEventMock({endAt});
		const eventId = event.id;

		// create guest
		const guest = await createGuest(eventId);
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
