import assert from "assert";
import sinon from "sinon";
import {describe, it} from "mocha";

import JWTCookieParser from "../../../express/middleware/JWTCookieParser.js";

describe(`express middleware ${JWTCookieParser.name}`, () => {
	it("should be able to not found cookies", async () => {
		// given
		// create http stuff and spies
		const req = {};
		const resSpy = {};
		const nextSpy = sinon.spy();
		const loggerSpy = sinon.spy();
		const logger = {debug: loggerSpy};
		const cookieKey = "cookieKey";

		// when
		const middleware = JWTCookieParser(cookieKey, logger);

		await middleware(req, resSpy, nextSpy);

		// than
		assert(nextSpy.calledOnce);
		assert(loggerSpy.calledOnce);
		assert(loggerSpy.calledWithExactly(`cookies is not Found in request`));
	});

	it("should be able to cookiekey notfound", async () => {
		// given
		// create http stuff and spies
		const req = {cookies: {}};
		const resSpy = {};
		const nextSpy = sinon.spy();
		const loggerSpy = sinon.spy();
		const logger = {debug: loggerSpy};

		const cookieKey = "cookieKey";

		// when
		const middleware = JWTCookieParser(cookieKey, logger);

		await middleware(req, resSpy, nextSpy);

		// than
		assert(nextSpy.calledOnce);
		assert(loggerSpy.calledOnce);
		assert(
			loggerSpy.calledWithExactly(
				`jwtCookies not Found in request by cookie key ${cookieKey}`,
			),
		);
	});

	it("should be able to parser jwt cookie", async () => {
		// given
		// create http stuff and spies
		const cookieKey = "cookieKey";
		const req = {cookies: {[cookieKey]: "cookieValue"}};
		const resSpy = {};
		const nextSpy = sinon.spy();
		const loggerSpy = sinon.spy();
		const logger = {debug: loggerSpy};

		// when
		const middleware = JWTCookieParser(cookieKey, logger);

		await middleware(req, resSpy, nextSpy);

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
