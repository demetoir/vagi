import assert from "assert";
import {describe, it} from "mocha";

import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {eventQuery} from "../../../DB/modelQuerys";
import EventFixtures from "../../fixtures/EventFixtures.js";
import HostFixtures from "../../fixtures/HostFixtures.js";

describe("event query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create", async () => {
		const eventCode = "event code";
		const eventName = "event name";
		const HostId = null;

		const event = await eventQuery.create({
			eventCode,
			HostId,
			eventName,
		});

		const existEvent = await eventQuery.findOneById(event.id);

		assert.deepStrictEqual(event, existEvent);
	});

	it("findAll", async () => {
		const event = await EventFixtures.activeEvent();

		const res = await eventQuery.findAll();

		assert.deepStrictEqual(res, [event]);
	});

	describe("findById", () => {
		it("return exist one", async () => {
			const existEvent = await EventFixtures.activeEvent();

			const event = await eventQuery.findById(existEvent.id);

			assert.deepStrictEqual(event, existEvent);
		});

		it("return null on not exist", async () => {
			const event = await eventQuery.findById(4444);

			assert(event === null);
		});
	});

	describe("updateEventById", () => {
		it("update", async () => {
			const event = await EventFixtures.activeEvent();
			const id = event.id;

			const newValue = {
				moderationOption: true,
				replyOption: true,
				startAt: new Date(),
				endAt: new Date(),
			};

			const affectedRows = await eventQuery.updateEventById({
				id,
				...newValue,
			});

			assert.equal(affectedRows, 1);

			const inDb = await eventQuery.findOneById(id);

			assert.equal(inDb.moderationOption, newValue.moderationOption);
			assert.equal(inDb.replyOption, newValue.replyOption);
			assert.equal(inDb.startAt.toString(), newValue.startAt.toString());
			assert.equal(inDb.endAt.toString(), newValue.endAt.toString());
		});

		it("not update on exist", async () => {
			const id = 777;

			const newValue = {
				moderationOption: true,
				replyOption: true,
				startAt: new Date(),
				endAt: new Date(),
			};

			const affectedRows = await eventQuery.updateEventById({
				id,
				...newValue,
			});

			assert.equal(affectedRows, 0);
		});
	});

	describe("findByEventCode", () => {
		it("return exist", async () => {
			const existEvent = await EventFixtures.activeEvent();

			const event = await eventQuery.findOneByEventCode(
				existEvent.eventCode,
			);

			assert.deepStrictEqual(event, existEvent);
		});

		it("return null on not exist", async () => {
			const eventCode = "0000";

			const res = await eventQuery.findOneByEventCode(eventCode);

			assert(res === null);
		});
	});

	describe("findAllByHostId", () => {
		it("return exist", async () => {
			const host = await HostFixtures.host();
			const existEvent = await EventFixtures.activeEvent(host);

			const events = await eventQuery.findAllByHostId(existEvent.HostId);

			assert.deepStrictEqual(events, [existEvent]);
		});
	});

	describe("getEventOptionByEventId", () => {
		it("return exist", async () => {
			const existEvent = await EventFixtures.activeEvent();

			const options = await eventQuery.getEventOptionByEventId(
				existEvent.id,
			);

			assert.deepStrictEqual(options, {
				moderationOption: existEvent.moderationOption,
				replyOption: existEvent.replyOption,
			});
		});

		it("return null on not exist", async () => {
			const id = 7777;

			const event = await eventQuery.getEventOptionByEventId(id);

			assert.equal(event, null);
		});
	});
});
