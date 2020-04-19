import assert from "assert";
import sinon from "sinon";
import btoa from "btoa";
import {beforeEach, describe, it} from "mocha";
import GuestController from "../../../express/controller/GuestController.js";
import config from "../../../express/config";
import CookieKeys from "../../../express/CookieKeys.js";
import EventFixtures from "../../fixtures/EventFixtures.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

const {routePage} = config;

describe("GuestController", () => {
	new SequelizeTestHelper().autoSetup();

	const redirectSpy = sinon.spy();
	const clearCookieSpy = sinon.spy();
	const cookieSpy = sinon.spy();
	const response = {
		redirect: redirectSpy,
		clearCookie: clearCookieSpy,
		cookie: cookieSpy,
	};
	let request = {params: {}};

	beforeEach(() => {
		redirectSpy.resetHistory();
		clearCookieSpy.resetHistory();
		cookieSpy.resetHistory();
	});

	describe("construct", () => {
		it("with out args", () => {
			const guestController = new GuestController();

			assert.notEqual(guestController, undefined);
			assert.deepStrictEqual(guestController.logger, console);
		});

		it("with out args", () => {
			const logger = {};
			const guestController = new GuestController(logger);

			assert.notEqual(guestController, undefined);
			assert.deepStrictEqual(guestController.logger, logger);
		});
	});

	describe("login", () => {
		const guestController = new GuestController();

		it("build controller", () => {
			const login = guestController.logIn();

			assert.equal(typeof login, "function");
		});

		it("redirect guest app ", async () => {
			const login = guestController.logIn();

			const result = await login(request, response);

			assert.equal(result, undefined);

			assert(redirectSpy.calledOnceWithExactly(routePage.guest));
		});
	});

	describe("logOut", () => {
		const guestController = new GuestController();

		it("build controller", () => {
			const logOut = guestController.logOut();

			assert.equal(typeof logOut, "function");
		});

		it("redirect main app", async () => {
			const logOut = guestController.logOut();

			const result = await logOut(request, response);

			assert.equal(result, undefined);
			assert(redirectSpy.calledOnceWithExactly(routePage.main));
			assert(clearCookieSpy.calledOnceWithExactly(CookieKeys.GUEST_APP));
		});
	});

	describe("signUp", () => {
		const guestController = new GuestController();

		it("build controller", () => {
			const signUp = guestController.signUp();

			assert.equal(typeof signUp, "function");
		});

		it("redirect on params not found encodedEventCode", async () => {
			const signUp = guestController.signUp();
			const req = {params: {}};

			await signUp(req, response);

			assert(redirectSpy.calledOnceWithExactly(routePage.main));
		});

		it("throw Error fallback on decode event code", async () => {
			const signUp = guestController.signUp();
			const invalidEncodedEventCode = "#$^%@#$%@#$%";
			const req = {params: {encodedEventCode: invalidEncodedEventCode}};

			try {
				await signUp(req, response);

				assert(false, "should throw error");
			} catch (e) {
				assert.deepStrictEqual(
					e,
					new Error("can not decode eventCode"),
				);
			}
		});

		// todo need db mock witch throw Error
		// it("throw Error fallback on create guest", () => {
		//
		// });

		// todo is it real possible?
		// it("throw Error fallback on sign JWT", () => {
		// 	assert(false);
		// });

		it("redirect main app on invalid event code", async () => {
			const signUp = guestController.signUp();
			const event = await EventFixtures.closedEvent();

			const encodedEventCode = btoa(event.eventCode);
			const req = {params: {encodedEventCode}};

			const result = await signUp(req, response);

			assert(redirectSpy.calledOnceWithExactly(routePage.main));
		});

		it("redirect guest app on success", async () => {
			const signUp = guestController.signUp();
			const event = await EventFixtures.activeEvent();

			const encodedEventCode = btoa(event.eventCode);
			const req = {params: {encodedEventCode}};

			await signUp(req, response);

			assert(cookieSpy.calledOnce);
			assert(redirectSpy.calledOnceWithExactly(routePage.guest));
			// todo think do i need check cookie value?
		});
	});
});
