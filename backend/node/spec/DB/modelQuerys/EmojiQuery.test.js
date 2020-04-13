import assert from "assert";
import {describe, it} from "mocha";
import {emojiQuery} from "../../../DB/modelQuerys";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";

// noinspection JSUnresolvedVariable

describe("emoji query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create emoji", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const EventId = null;
		const name = "name";

		// when
		const emoji = await emojiQuery.create({
			GuestId,
			name,
			QuestionId,
			EventId,
		});

		// than
		const inDB = await emojiQuery.findById(emoji.id);

		assert.deepStrictEqual(emoji, inDB);
	});

	it("delete emoji by id", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const EventId = null;
		const name = "name";

		const {id} = await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const affectedRows = await emojiQuery.deleteById(id);

		// than
		assert.equal(affectedRows, 1);

		const inDb = await emojiQuery.findById(id);

		assert.equal(inDb, null);
	});

	it("delete emoji by GuestId, name, QuestionId ", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const name = "234234";
		const EventId = undefined;

		await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const affectedRows = await emojiQuery.deleteBy({
			name,
			QuestionId,
			GuestId,
		});

		// than
		assert(affectedRows === 1);
		// todo more assert

		const res = await emojiQuery.findBy({name, QuestionId, GuestId});

		assert.equal(res, null);
	});

	it("find did i picked emoji list", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const name = "234234";
		const EventId = undefined;

		await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const real = await emojiQuery.getDidIPicked({
			name,
			GuestId,
			QuestionId,
		});

		// than
		assert(real.length > 0);
		// todo more assert
	});

	it("get count of emoji By question and name", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const name = "234234";
		const EventId = undefined;

		await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const real = await emojiQuery.getCountBy({name, QuestionId});

		// than
		// todo more assert
		assert(real > 0);
	});

	it("find emoji count by eventId group by QuestionId", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const name = "234234";
		const EventId = null;

		await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const real = await emojiQuery.getEmojiCountByEventIdGroupByQuestionId({
			EventId,
		});

		// than
		// todo more assert
		assert.equal(real.length, 1);
	});

	it("get emoji pick", async () => {
		// given
		const GuestId = null;
		const QuestionId = null;
		const name = "234234";
		const EventId = null;

		await emojiQuery.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		// when
		const real = await emojiQuery.getEmojiPick({EventId, GuestId});

		// than
		assert(real.length > 0);

		// todo more assert
	});
});
