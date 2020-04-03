import assert from "assert";
import sinon from "sinon";
import {after, before, afterEach, describe, it} from "mocha";
import jwt from "jsonwebtoken";
import hostAuth from "../../express/middleware/hostAuth.js";
import CookieKeys from "../../express/CookieKeys.js";
import config from "../../express/config";
import {findOrCreateHostByOAuth} from "../../DB/queries/host.js";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";

const {tokenArgs, routePage} = config;

describe("express hostAuth middleware", () => {
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

	it("should be able to fail on host cookie Key not found", async () => {
		// given
		const req = {cookies: {}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await hostAuth(req, resSpy, nextSpy);

		// than
		assert(nextSpy.calledOnce);
		assert(redirectSpy.notCalled);
	});

	it("should be able to fail on jwt invalid", async () => {
		// given
		const req = {cookies: {[cookieKey]: "invalid jwt value"}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await hostAuth(req, resSpy, nextSpy);

		// than
		assert(nextSpy.calledOnce);
		assert(redirectSpy.notCalled);
	});

	it("should be able to fail on verify host user", async () => {
		// given
		const req = {cookies: {[cookieKey]: "invalid jwt value"}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await hostAuth(req, resSpy, nextSpy);

		// than
		assert(nextSpy.calledOnce);
		assert(redirectSpy.notCalled);
	});

	it("should be able to pass", async () => {
		// given
		// create host
		const name = "host name";
		const oauthId = "oauthId";
		const image = "image";
		const email = "email";
		const host = await findOrCreateHostByOAuth({name, email, image, oauthId});

		// create signed jwt
		const hostJwt = {sub: host.oauthId};
		const payload = jwt.sign(
			hostJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const req = {cookies: {[cookieKey]: payload}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await hostAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.calledOnce);
		assert(redirectSpy.calledWith(routePage.host));
		assert(nextSpy.notCalled);
	});
});
