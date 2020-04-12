import assert from "assert";
import {describe, it} from "mocha";

import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {eventQuery} from "../../../DB/modelQuerys";

describe("event query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("should be able to find all events", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		await eventQuery.findOrCreateEvent({eventCode, HostId, eventName});

		const res = await eventQuery.getAllEvents();

		assert(Array.isArray(res));
		assert(res.length > 0);
	});

	it("should be able to create event", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		const [event, isFound] = await eventQuery.findOrCreateEvent({
			eventCode,
			HostId,
			eventName,
		});

		const existEvent = await eventQuery.findOneById(event.id);

		assert.deepStrictEqual(event, existEvent);
		assert.equal(isFound, true);
	});

	it("should be able to find event by id", async () => {
		const oldData = {
			eventName: "event name2",
			eventCode: "event code2",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const [oldEvent, isFound] = await eventQuery.findOrCreateEvent(oldData);
		const id = oldEvent.id;

		const event = await eventQuery.getEventById(id);

		assert.deepStrictEqual(oldEvent, event);
		assert.equal(isFound, true);
	});

	it("should be able to return null when can not find event by id", async () => {
		const event = await eventQuery.getEventById(4444);

		assert(event === null);
	});

	describe("findOneById", () => {
		it("return exist", async () => {
			const oldData = {
				eventName: "event name2",
				eventCode: "event code2",
				HostId: null,
				moderationOption: true,
				replyOption: true,
				startAt: new Date(),
				endAt: new Date(),
			};
			const [oldEvent, isFound] = await eventQuery.findOrCreateEvent(oldData);
			const id = oldEvent.id;

			const event = await eventQuery.getEventById(id);

			assert.deepStrictEqual(oldEvent, event);
		});

		it("return null on not exist", async () => {
			const event = await eventQuery.findOneById(123123123);

			assert(event === null);
		});
	});

	it("should be able to updateEventById", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		const [event, isFound] = await eventQuery.findOrCreateEvent({
			eventCode,
			HostId,
			eventName,
		});

		const id = event.id;

		const newValue = {
			eventCode: "15125",
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		const res = await eventQuery.updateEventById({id, ...newValue});

		assert(typeof res === "number");
		assert(res > 0);
	});

	it("should be able to getEventByEventCode", async () => {
		const oldData = {
			eventName: "event name2",
			eventCode: "event code2",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const [oldEvent, isFound] = await eventQuery.findOrCreateEvent(oldData);

		const event = await eventQuery.getEventByEventCode(oldData.eventCode);

		assert.deepStrictEqual(oldEvent, event);
	});

	it("should be able to return null when can not getEventByEventCode", async () => {
		const eventCode = "0000";

		const res = await eventQuery.getEventByEventCode(eventCode);

		assert(res === null);
	});

	it("should be able to getEventsByHostId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		await eventQuery.findOrCreateEvent(oldData);

		const events = await eventQuery.getEventsByHostId(oldData.HostId);

		assert(events.length > 0);
	});

	it("should be able to getEventOptionByEventId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const [oldEvent, isFound] = await eventQuery.findOrCreateEvent(oldData);
		const id = oldEvent.id;

		const event = await eventQuery.getEventOptionByEventId(id);

		assert.equal(event.moderationOption, oldEvent.moderationOption);
		assert.equal(event.replyOption, oldEvent.replyOption);
	});

	it("should be able to return null when can not getEventOptionByEventId", async () => {
		const oldData = {
			eventName: "event name3",
			eventCode: "event code3",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};

		await eventQuery.findOrCreateEvent(oldData);
		const id = 7777;

		const event = await eventQuery.getEventOptionByEventId(id);

		assert.equal(event, null);
	});
});
