import assert from "assert";
import sinon from "sinon";
import {beforeEach, describe, it} from "mocha";
import config from "../../../express/config";
import CookieKeys from "../../../express/CookieKeys.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import HostController from "../../../express/controller/HostController.js";

const {routePage} = config;

describe("HostController", () => {
	new SequelizeTestHelper().autoSetup();

	const redirectSpy = sinon.spy();
	const clearCookieSpy = sinon.spy();
	const cookieSpy = sinon.spy();
	const response = {
		redirect: redirectSpy,
		clearCookie: clearCookieSpy,
		cookie: cookieSpy,
	};
	const request = {params: {}};

	beforeEach(() => {
		redirectSpy.resetHistory();
		clearCookieSpy.resetHistory();
		cookieSpy.resetHistory();
	});

	describe("construct", () => {
		it("with out args", () => {
			const hostController = new HostController();

			assert.notEqual(hostController, undefined);
			assert.deepStrictEqual(hostController.logger, console);
		});

		it("with out args", () => {
			const logger = {};
			const guestController = new HostController(logger);

			assert.notEqual(guestController, undefined);
			assert.deepStrictEqual(guestController.logger, logger);
		});
	});

	describe("logout", () => {
		const hostController = new HostController();
		const logOut = hostController.logout();

		it("build controller", () => {
			assert.equal(typeof logOut, "function");
		});

		it("redirect main app", async () => {
			const result = await logOut(request, response);

			assert.equal(result, undefined);
			assert(redirectSpy.calledOnceWithExactly(routePage.main));
			assert(clearCookieSpy.calledOnceWithExactly(CookieKeys.HOST_APP));
		});
	});

	describe("redirectToHostApp", () => {
		const hostController = new HostController();
		const redirectToHostApp = hostController.redirectToHostApp();

		it("build controller", () => {
			assert.equal(typeof redirectToHostApp, "function");
		});

		it("throw Error on params not found encodedEventCode", async () => {
			const result = await redirectToHostApp(request, response);

			assert.equal(result, undefined);
			assert(redirectSpy.calledOnceWithExactly(routePage.host));
		});
	});
});
