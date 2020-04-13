import assert from "assert";
import {describe, it} from "mocha";
import models from "../../../DB/models";

import {
	POLL_STATE_CLOSED,
	POLL_STATE_RUNNING,
} from "../../../constants/pollState.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {pollQuery} from "../../../DB/modelQuerys";

describe("poll query api", () => {
	const Poll = models.Poll;

	new SequelizeTestHelper().autoSetup();

	it("getPollsByEventId", async () => {
		// given

		const EventId = null;
		const pollName = "poll name";
		const pollType = "poll type";
		const selectionType = "selection type";
		const allowDuplication = false;
		const pollDate = new Date();
		const state = "state";

		const poll = (
			await Poll.create({
				EventId,
				pollName,
				pollType,
				selectionType,
				allowDuplication,
				state,
				pollDate,
			})
		).get({plain: true});

		// when
		const res = await pollQuery.findByEventId(EventId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], poll);
	});

	it("openPoll", async () => {
		const EventId = null;
		const pollName = "poll name";
		const pollType = "nItem";
		const selectionType = "sim";
		const allowDuplication = false;
		const state = "standby";
		const pollDate = new Date();

		const poll = await Poll.create({
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			pollDate,
		});

		// when
		const result = await pollQuery.openPoll(poll.id);

		// than
		assert.equal(result, 1);
		const real = await Poll.findOne({where: {id: poll.id}});

		assert.equal(real.state, POLL_STATE_RUNNING);
	});

	it("closePoll", async () => {
		const EventId = null;
		const pollName = "poll name";
		const pollType = "nItem";
		const selectionType = "sim";
		const allowDuplication = false;
		const state = "standby";
		const pollDate = new Date();

		const poll = await Poll.create({
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			pollDate,
		});

		// when
		const result = await pollQuery.closePoll(poll.id);

		// than
		assert.equal(result, 1);
		const real = await Poll.findOne({where: {id: poll.id}});

		assert.equal(real.state, POLL_STATE_CLOSED);
	});

	it("create poll", async () => {
		// given
		const EventId = null;
		const pollName = "poll name";
		const pollType = "poll type";
		const selectionType = "selection type";
		const allowDuplication = false;

		// when
		const poll = await pollQuery.create({
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
		});

		// than
		assert(poll.id > 0);
		assert.equal(poll.EventId, EventId);
		assert.equal(poll.pollName, pollName);
		assert.equal(poll.pollType, pollType);
		assert.equal(poll.selectionType, selectionType);
		assert.equal(poll.allowDuplication, allowDuplication);
	});
});
