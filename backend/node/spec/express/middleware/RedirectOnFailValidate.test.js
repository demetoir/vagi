import assert from "assert";
import sinon from "sinon";
import {beforeEach, describe, it} from "mocha";
import RedirectOnFailValidate from "../../../express/middleware/RedirectOnFailValidate.js";

describe(`express middleware RedirectOnFailValidate`, () => {
	const redirectSpy = sinon.spy();
	const resSpy = {redirect: redirectSpy};
	const nextSpy = sinon.spy();
	const redirectPath = "redirectPath";

	beforeEach(() => {
		redirectSpy.resetHistory();
		nextSpy.resetHistory();
	});

	it("redirect on validate fail", async () => {
		// given
		const req = {};

		function alwaysFalse() {
			return [false, new Error("always false")];
		}

		// when
		const middleware = RedirectOnFailValidate(alwaysFalse, redirectPath);

		await middleware(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.calledOnce);
		assert(redirectSpy.calledWith(redirectPath));
		assert(nextSpy.notCalled);
	});

	it("build middleware", async () => {
		// given
		function alwaysFalse() {
			return [false, new Error("always false")];
		}

		// when
		const middleware = RedirectOnFailValidate(alwaysFalse, redirectPath);

		assert.notEqual(middleware, undefined);
		assert.equal(typeof middleware, "function");
	});

	it("call reqValidateFunc with req", async () => {
		const req = {data: "data"};

		const reqValidateFuncSpy = sinon.spy();

		function reqValidateFunc(request) {
			reqValidateFuncSpy(request);
			return [false, new Error("always false")];
		}

		// when
		const middleware = RedirectOnFailValidate(
			reqValidateFunc,
			redirectPath,
		);

		await middleware(req, resSpy, nextSpy);

		assert(reqValidateFuncSpy.calledOnce);
		assert(reqValidateFuncSpy.calledWith(req));
	});

	it("call next", async () => {
		// given
		const req = {};

		function alwaysTrue() {
			return [true, null];
		}

		// when
		const middleware = RedirectOnFailValidate(alwaysTrue, redirectPath);

		await middleware(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});
});
