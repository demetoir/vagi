import assert from "assert";
import {describe, it} from "mocha";

import {findOrCreateEvent} from "../../../DB/queries/event.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {hashtagQuery} from "../../../DB/modelQuerys";

describe("hashtag query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create ", async () => {
		// given
		const EventId = null;
		const name = "name";

		// when
		const hashtag = await hashtagQuery.create({EventId, name});

		// than
		assert(hashtag.id > 0);
		assert.equal(hashtag.name, name);
		assert.equal(hashtag.EventId, EventId);
	});

	it("update by id", async () => {
		// given
		const EventId = null;
		const name = "name";
		const hashtag = await hashtagQuery.create({EventId, name});

		// when
		const res = await hashtagQuery.updateById({
			id: hashtag.id,
			name: "newName",
		});

		// than
		assert(res > 0);
	});

	it("delete by id", async () => {
		// given
		const EventId = null;
		const name = "name";
		const hashtag = await hashtagQuery.create({EventId, name});

		// when
		const res = await hashtagQuery.deleteById(hashtag.id);

		// than
		assert(res > 0);
	});

	it("find by event id", async () => {
		// given
		const EventId = null;
		const name = "name";

		await hashtagQuery.create({EventId, name});

		// when
		const res = await hashtagQuery.findByEventId(EventId);

		// than
		assert(res.length > 0);
	});

	it("find by event ids", async () => {
		// given
		const oldData = {
			eventName: "event name2",
			eventCode: "event code2",
			HostId: null,
			moderationOption: true,
			replyOption: true,
			startAt: new Date(),
			endAt: new Date(),
		};
		const oldEvent = await findOrCreateEvent(oldData);
		const EventId = oldEvent.id;
		const name = "name";

		await hashtagQuery.create({EventId, name});
		await hashtagQuery.create({EventId, name});

		// when
		const res = await hashtagQuery.findByEventIds([EventId]);

		// than
		assert(res.length > 0);
	});
});
