import assert from "assert";
import sinon from "sinon";
import {beforeEach, describe, it} from "mocha";
import config from "../../../express/config";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import AuthController from "../../../express/controller/AuthController.js";
import HostFixtures from "../../fixtures/HostFixtures.js";

const {routePage} = config;

describe("AuthController", () => {
	new SequelizeTestHelper().autoSetup();

	const redirectSpy = sinon.spy();
	const clearCookieSpy = sinon.spy();
	const cookieSpy = sinon.spy();
	const response = {
		redirect: redirectSpy,
		clearCookie: clearCookieSpy,
		cookie: cookieSpy,
	};

	beforeEach(() => {
		redirectSpy.resetHistory();
		clearCookieSpy.resetHistory();
		cookieSpy.resetHistory();
	});

	describe("construct", () => {
		it("with out args", () => {
			const authController = new AuthController();

			assert.notEqual(authController, undefined);
			assert.deepStrictEqual(authController.logger, console);
		});

		it("with out args", () => {
			const logger = {};
			const authController = new AuthController(logger);

			assert.notEqual(authController, undefined);
			assert.deepStrictEqual(authController.logger, logger);
		});
	});

	describe("googleAuthCallback", () => {
		const authController = new AuthController();

		const callback = authController.googleAuthCallback();

		it("build callback", () => {
			assert.equal(typeof callback, "function");
		});

		it("redirect on success", async () => {
			const oauthId = "1234";
			const host = await HostFixtures.host(oauthId);

			const result = await callback({user: host}, response);

			assert.equal(result, undefined);

			assert(redirectSpy.calledOnceWithExactly(routePage.host));
			assert(cookieSpy.calledTwice);
		});

		describe("redirect main on error", () => {
			it("user property not exist in request", async () => {
				const result = await callback({}, response);

				assert.equal(result, undefined);

				assert(redirectSpy.calledOnceWithExactly(routePage.main));
				assert(cookieSpy.notCalled);
			});

			it("oauthId property not exist in req.user", async () => {
				const result = await callback({user: {}}, response);

				assert.equal(result, undefined);

				assert(redirectSpy.calledOnceWithExactly(routePage.main));
				assert(cookieSpy.notCalled);
			});
		});
	});
});
