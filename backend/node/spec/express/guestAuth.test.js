import assert from "assert";
import sinon from "sinon";
import {after, afterEach, before, describe, it} from "mocha";
import jwt from "jsonwebtoken";
import moment from "moment";
import CookieKeys from "../../express/CookieKeys.js";
import config from "../../express/config";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import guestAuth from "../../express/middleware/guestAuth.js";
import {findOrCreateEvent} from "../../DB/queries/event.js";
import {createGuest} from "../../DB/queries/guest.js";

const {tokenArgs, routePage} = config;

let stampCounter = 0;

function getStamp() {
	return stampCounter++;
}

async function createEventMock({HostId = null, stamp = getStamp(), endAt = new Date()} = {}) {
	const eventCode = `event code${stamp}`;
	const eventName = ` event name${stamp}`;

	return findOrCreateEvent({eventCode, HostId, eventName, endAt});
}

// todo refactorign here
/**
 *
 * @param eventCode {String}
 * @return {string}
 */
function encodeEventCode(eventCode) {
	return Buffer.from(eventCode).toString("base64");
}

describe("express guestAuth middleware", () => {
	const cookieKey = CookieKeys.GUEST_APP;
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


	it("should be able to fail on parse guest jwt", async () => {
		// given
		// create http stuff and spies
		const req = {cookies: {}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to fail on verify guest jwt with invalid jwt", async () => {
		// given
		// create http stuff and spies
		const req = {cookies: {[cookieKey]: "in valid jwt"}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to fail on verify event with not exist event", async () => {
		// given
		// create event
		const event = await createEventMock();
		const eventId = event.id;

		// create guest
		const guest = await createGuest(eventId);
		const guestSid = guest.guestSid;

		// create jwt
		const guestJwt = {sub: guestSid};
		const payload = jwt.sign(
			guestJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const notExistEventCode = "not exist event code";
		const encodedEventCode = encodeEventCode(notExistEventCode);

		const req = {cookies: {[cookieKey]: payload}, params: {path: encodedEventCode}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to fail on verify event with not active event", async () => {
		// given
		// create event
		const event = await createEventMock();
		const eventId = event.id;


		// create guest
		const guest = await createGuest(eventId);
		const guestSid = guest.guestSid;

		// create jwt
		const guestJwt = {sub: guestSid};
		const payload = jwt.sign(
			guestJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const encodedEventCode = encodeEventCode(event.eventCode);
		const req = {cookies: {[cookieKey]: payload}, params: {path: encodedEventCode}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to fail on verify guest with not exist guest", async () => {
		// given
		// create event
		const endAt = moment().add(4, "h")
			.toDate();
		const event = await createEventMock({endAt});

		// create guest
		const guestSid = "in valid sid";

		// create jwt
		const guestJwt = {sub: guestSid};
		const payload = jwt.sign(
			guestJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const encodedEventCode = encodeEventCode(event.eventCode);
		const req = {cookies: {[cookieKey]: payload}, params: {path: encodedEventCode}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to fail on verify guest with not belong to event", async () => {
		// given
		// create event

		const endAt = moment().add(4, "h")
			.toDate();
		const event = await createEventMock({endAt});
		const otherEvent = await createEventMock({endAt});

		// create guest
		const guest = await createGuest(event.id);
		const guestSid = guest.guestSid;

		// create jwt
		const guestJwt = {sub: guestSid};
		const payload = jwt.sign(
			guestJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const encodedEventCode = encodeEventCode(otherEvent.eventCode);
		const req = {cookies: {[cookieKey]: payload}, params: {path: encodedEventCode}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.notCalled);
		assert(nextSpy.calledOnce);
	});

	it("should be able to pass", async () => {
		// given
		// create event
		const endAt = moment().add(4, "h")
			.toDate();
		const event = await createEventMock({endAt});

		// create guest
		const guest = await createGuest(event.id);
		const guestSid = guest.guestSid;

		// create jwt
		const guestJwt = {sub: guestSid};
		const payload = jwt.sign(
			guestJwt,
			tokenArgs.secret,
		);

		// create http stuff and spies
		const encodedEventCode = encodeEventCode(event.eventCode);
		const req = {cookies: {[cookieKey]: payload}, params: {path: encodedEventCode}};
		const redirectSpy = sinon.spy();
		const resSpy = {redirect: redirectSpy};
		const nextSpy = sinon.spy();

		// when
		await guestAuth(req, resSpy, nextSpy);

		// than
		assert(redirectSpy.calledOnce);
		assert(redirectSpy.calledWith(routePage.guest));
		assert(nextSpy.notCalled);
	});
});
