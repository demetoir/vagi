import assert from "assert";
import sinon from "sinon";
import {beforeEach, describe, it} from "mocha";

import JWTCookieParser from "../../../express/middleware/JWTCookieParser.js";

describe(`express middleware JWTCookieParser`, () => {
	const nextSpy = sinon.spy();
	const loggerSpy = sinon.spy();
	const logger = {debug: loggerSpy};
	const cookieKey = "cookieKey";

	beforeEach(() => {
		nextSpy.resetHistory();
		loggerSpy.resetHistory();
	});

	it("build middleware", async () => {
		// when
		const middleware = JWTCookieParser(cookieKey, logger);

		assert.notEqual(middleware, undefined);
		assert.equal(typeof middleware, "function");
	});

	describe("call next", () => {
		it("on not found cookies", async () => {
			// given
			const req = {};

			// when
			const middleware = JWTCookieParser(cookieKey, logger);

			await middleware(req, null, nextSpy);

			// than
			assert(nextSpy.calledOnce);
			assert(loggerSpy.calledOnce);
			assert(
				loggerSpy.calledWithExactly(`cookies is not Found in request`),
			);
		});

		it("on cookie key notfound", async () => {
			// given
			const req = {cookies: {}};

			// when
			const middleware = JWTCookieParser(cookieKey, logger);

			await middleware(req, null, nextSpy);

			// than
			assert(nextSpy.calledOnce);
			assert(loggerSpy.calledOnce);
			assert(
				loggerSpy.calledWithExactly(
					`jwtCookies not Found in request by cookie key ${cookieKey}`,
				),
			);
		});

		it("on parser jwt cookie", async () => {
			// given
			const req = {cookies: {[cookieKey]: "cookieValue"}};

			// when
			const middleware = JWTCookieParser(cookieKey, logger);

			await middleware(req, null, nextSpy);

			// than
			assert(nextSpy.calledOnce);
			assert(loggerSpy.calledOnce);
			assert(
				loggerSpy.calledWithExactly(
					`parse JWT cookie of cookie key ${cookieKey}`,
				),
			);
		});
	});
});
