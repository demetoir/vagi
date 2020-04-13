import assert from "assert";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {guestQuery} from "../../../DB/modelQuerys";

describe("GuestQuery", () => {
	new SequelizeTestHelper().autoSetup();

	it("create guest", async () => {
		// given
		const EventId = null;

		// when
		const guest = await guestQuery.create(EventId);

		const inDb = await guestQuery.findById(guest.id);

		// than
		assert.deepStrictEqual(guest, inDb);
	});

	it("return null when can not findByGuestSid", async () => {
		const res = await guestQuery.findByGuestSid("234234");

		assert(res === null);
	});

	it("getGuestByGuestSid", async () => {
		// given
		const EventId = null;
		const guest = await guestQuery.create(EventId);

		// when
		const res = await guestQuery.findByGuestSid(guest.guestSid);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("get guest by Id", async () => {
		// given
		const EventId = null;
		const guest = await guestQuery.create(EventId);

		// when
		const res = await guestQuery.findById(guest.id);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("return when can not get guest by Id", async () => {
		// given
		const id = 1236123;

		// when
		const res = await guestQuery.findById(id);

		// than
		assert(res === null);
	});

	it("update guest", async () => {
		// given
		const EventId = null;
		const guest = await guestQuery.create(EventId);
		const name = "newName";

		// when
		const res = await guestQuery.updateById({id: guest.id, name});

		// than
		assert(res > 0);
	});

	it("get guest by EventId", async () => {
		// given
		const EventId = null;
		const guest = await guestQuery.create(EventId);

		// when
		const res = await guestQuery.findByEventId(EventId);

		assert.deepStrictEqual(res, [guest]);
	});
});
