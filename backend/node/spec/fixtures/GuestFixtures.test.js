import assert from "assert";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import EventFixtures from "./EventFixtures.js";
import GuestFixtures from "./GuestFixtures.js";
import {getGuestById} from "../../DB/queries/guest.js";

describe(`guest fixture`, () => {
	new SequelizeTestHelper().autoSetup();

	describe("guest", () => {
		it("with out args", async () => {
			const guest = await GuestFixtures.guest();
			const real = await getGuestById(guest.id);

			assert.deepStrictEqual(guest, real);
		});

		it("with out hostId", async () => {
			const event = await EventFixtures.activeEvent();
			const guest = await GuestFixtures.guest(event);
			const real = await getGuestById(guest.id);

			assert.deepStrictEqual(guest, real);
		});
	});
});
