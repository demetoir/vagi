import assert from "assert";
import sinon from "sinon";
import {describe, it} from "mocha";
import RedirectOnFailValidate from "../../../express/middleware/RedirectOnFailValidate.js";


describe(`express middleware ${RedirectOnFailValidate.name}`, () => {
	it("should be able to redirect on validate fail", async () => {
		// given
		// create http stuff and spies
		const req = {};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();
		const redirectPath = "redirectPath";

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


	it("should be able to call next", async () => {
		// given
		// create http stuff and spies
		const req = {};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();
		const redirectPath = "redirectPath";

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
