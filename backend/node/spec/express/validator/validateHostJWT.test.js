import assert from "assert";
import {describe, it} from "mocha";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import validateHostJWTCookie from "../../../express/validator/validateHostJWTCookie.js";
import hostJWTCookie from "../../../express/JWTCookie/hostJWTCookie.js";
import HostFixtures from "../../fixtures/HostFixtures.js";

describe(`express hostAuth validateHostJWTCookie`, () => {
	const cookieKey = CookieKeys.HOST_APP;

	new SequelizeTestHelper().autoSetup();

	describe("is invalid", () => {
		it("on jwtCookies not found", async () => {
			// given
			const req = {};

			// when
			const [isValid, error] = await validateHostJWTCookie(req);

			// than
			assert.equal(isValid, false);
			assert.equal(error.name, "JWTCookieError");
			assert.equal(
				error.message,
				"jwtCookies not found in request object",
			);
		});

		it("on host cookie Key not found", async () => {
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

		it("on jwt invalid", async () => {
			// given
			const req = {jwtCookies: {[cookieKey]: "invalid jwt value"}};

			// when
			const [isValid, error] = await validateHostJWTCookie(req);

			// than
			assert.equal(isValid, false);
			assert.equal(error.name, "JsonWebTokenError");
			assert.equal(error.message, "jwt malformed");
		});

		it("on verify host user", async () => {
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
	});

	it("is valid", async () => {
		// given
		// create host
		const host = await HostFixtures.host();
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
