import jwt, {JsonWebTokenError} from "jsonwebtoken";
import assert from "assert";
import {describe, it} from "mocha";
import {
	JWTCookie,
	JWTCookieError,
} from "../../../express/JWTCookie/JWTCookie.js";
import JWTCookieFixture from "../../fixtures/JWTCookieFixture.js";

describe("JWTCookie", () => {
	const cookieKey = "cookieKey";
	const secret = "secret";
	const options = {};

	it("construct with args", async () => {
		const jwtCookie = new JWTCookie(cookieKey, secret, options);

		assert.notEqual(jwtCookie, undefined);
		assert.equal(jwtCookie.cookieKey, cookieKey);
		assert.equal(jwtCookie.secret, secret);
		assert.equal(jwtCookie.options, options);
	});

	it("sign", async () => {
		const jwtCookie = new JWTCookie(cookieKey, secret, options);
		const payload = JWTCookieFixture.payload;

		const token = jwtCookie.sign(payload);

		assert.notEqual(token, undefined);

		const verifiedPayload = jwt.verify(token, secret);

		assert.equal(payload.data, verifiedPayload.data);
	});

	it("verify", async () => {
		const jwtCookie = new JWTCookie(cookieKey, secret, options);

		const payload = JWTCookieFixture.payload;
		const token = jwtCookie.sign(payload);
		const req = {jwtCookies: {cookieKey: token}};

		const verifiedPayload = jwtCookie.verify(req);

		assert.equal(verifiedPayload.data, payload.data);
	});

	describe("throw error while verify", () => {
		it("on JWTCookie not in request", async () => {
			const jwtCookie = new JWTCookie(cookieKey, secret, options);

			const req = {};

			assert.throws(() => {
				jwtCookie.verify(req);
			}, new JWTCookieError("jwtCookies not found in request object"));
		});

		it("on JWTCookie not in request", async () => {
			const jwtCookie = new JWTCookie(cookieKey, secret, options);

			const req = {jwtCookies: []};

			assert.throws(() => {
				jwtCookie.verify(req);
			}, new JWTCookieError(`jwt of cookie key '${cookieKey}' not found`));
		});

		it("on jwt malformed", async () => {
			const jwtCookie = new JWTCookie(cookieKey, secret, options);

			const req = {
				jwtCookies: {cookieKey: JWTCookieFixture.malformedJWT},
			};

			assert.throws(() => {
				jwtCookie.verify(req);
			}, new JsonWebTokenError("jwt malformed"));
		});
	});
});
