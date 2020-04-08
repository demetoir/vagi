import assert from "assert";
import {after, afterEach, before, describe, it} from "mocha";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import validateHostJWTCookie from "../../../express/validator/validateHostJWTCookie.js";
import {findOrCreateHostByOAuth} from "../../../DB/queries/host.js";
import hostJWTCookie from "../../../express/JWTCookie/hostJWTCookie.js";

describe(`express hostAuth validateHostJWTCookie`, () => {
	const cookieKey = CookieKeys.HOST_APP;

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
		const [isValid, error] = await validateHostJWTCookie(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "Error");
		assert.equal(error.message, "jwtCookies not found in request object");
	});

	it("should be able to fail on host cookie Key not found", async () => {
		// given
		const req = {jwtCookies: {}};

		// when
		const [isValid, error] = await validateHostJWTCookie(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "JWTCookieError");
		assert.equal(
			error.message,
			`jwt of cookie key '${cookieKey}' not found`,
		);
	});

	it("should be able to fail on jwt invalid", async () => {
		// given
		const req = {jwtCookies: {[cookieKey]: "invalid jwt value"}};

		// when
		const [isValid, error] = await validateHostJWTCookie(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "JsonWebTokenError");
		assert.equal(error.message, "jwt malformed");
	});

	it("should be able to fail on verify host user", async () => {
		// given
		const payload = {oauthId: "sefsef"};

		const token = hostJWTCookie.sign(payload);
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, error] = await validateHostJWTCookie(req);

		// than
		assert.equal(isValid, false);
		assert.equal(error.name, "ValidationError");
		assert.equal(error.message, "존재하지않는 host");
	});

	it("should be able to pass", async () => {
		// given
		// create host
		const name = "host name";
		const oauthId = "oauthId";
		const image = "image";
		const email = "email";
		const host = await findOrCreateHostByOAuth({
			name,
			email,
			image,
			oauthId,
		});

		const payload = {oauthId: host.oauthId};

		const token = hostJWTCookie.sign(payload);
		const req = {jwtCookies: {[cookieKey]: token}};

		// when
		const [isValid, result] = await validateHostJWTCookie(req);

		// than
		assert.equal(isValid, true);
		assert.deepStrictEqual(result, host);
	});
});
