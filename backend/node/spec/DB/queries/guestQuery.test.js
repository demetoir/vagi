import assert from "assert";
import {describe, it} from "mocha";
import {
	createGuest,
	getGuestsByEventId,
	getGuestByGuestSid,
	getGuestById,
	updateGuestById,
} from "../../../DB/queries/guest.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

describe("guest query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create guest", async () => {
		// given
		const EventId = null;

		// when
		const guest = await createGuest(EventId);

		// than
		assert(guest.id > 0);
		assert(guest.name !== null);
		assert(guest.guestSid !== null);
		assert(typeof guest.guestSid === "string");
		assert(guest.email === null);
		assert(guest.isAnonymous === true);
		assert(guest.email === null);
	});

	it("return null when can not findByGuestSid", async () => {
		const res = await getGuestByGuestSid("234234");

		assert(res === null);
	});

	it("getGuestByGuestSid", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);

		// when
		const res = await getGuestByGuestSid(guest.guestSid);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("get guest by Id", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);

		// when
		const res = await getGuestById(guest.id);

		// than
		assert.deepStrictEqual(guest, res);
	});

	it("return when can not get guest by Id", async () => {
		// given
		const id = 1236123;

		// when
		const res = await getGuestById(id);

		// than
		assert(res === null);
	});

	it("update guest", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);
		const name = "newName";

		// when
		const res = await updateGuestById({id: guest.id, name});

		// than
		assert(res > 0);
	});

	it("get guest by EventId", async () => {
		// given
		const EventId = null;
		const guest = await createGuest(EventId);

		// when
		const res = await getGuestsByEventId(EventId);

		assert.deepStrictEqual(res, [guest]);
	});
});
