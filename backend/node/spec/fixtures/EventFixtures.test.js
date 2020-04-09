import assert from "assert";
import {describe, it} from "mocha";
import moment from "moment";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import EventFixtures from "./EventFixtures.js";
import {getEventById} from "../../DB/queries/event.js";
import HostFixtures from "./HostFixtures.js";

function isActiveEvent(event) {
	const endAt = moment(event.endAt);
	const current = moment();
	const diff = endAt.diff(current, "minute");
	const isActive = diff > 0;

	return isActive;
}

describe(`event fixture`, () => {
	new SequelizeTestHelper().autoSetup();

	describe("active event", () => {
		it("with out args", async () => {
			const event = await EventFixtures.activeEvent();
			const real = await getEventById(event.id);

			assert.deepStrictEqual(event, real);
			assert.equal(isActiveEvent(event), true);
		});

		it("with out hostId", async () => {
			const host = await HostFixtures.host();
			const event = await EventFixtures.activeEvent(host);

			const real = await getEventById(event.id);

			assert.deepStrictEqual(event, real);
			assert.equal(isActiveEvent(event), true);
		});
	});

	describe("closed event", () => {
		it("with out args", async () => {
			const event = await EventFixtures.closedEvent();
			const real = await getEventById(event.id);

			assert.deepStrictEqual(event, real);
			assert.equal(isActiveEvent(event), false);
		});

		it("with out hostId", async () => {
			const host = await HostFixtures.host();
			const event = await EventFixtures.closedEvent(host);

			const real = await getEventById(event.id);

			assert.deepStrictEqual(event, real);
			assert.equal(isActiveEvent(event), false);
		});
	});
});
