import assert from "assert";
import {describe, it} from "mocha";
import models from "../../../DB/models";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {questionQuery} from "../../../DB/modelQuerys";

describe("questions query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create question", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		// when
		const res = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// than
		assert(typeof res === "object");
		assert.equal(res.EventId, EventId);
		assert.equal(res.GuestId, GuestId);
		assert.equal(res.content, content);
		assert.equal(res.state, "active");
		assert(typeof res.createdAt !== "undefined");
		assert(typeof res.updatedAt !== "undefined");
	});

	it("get by event id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await questionQuery.findByEventId(EventId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], question);
	});

	it("get question reply by event id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		const reply1 = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId: question.id,
		});

		// when
		const res = await questionQuery.findReplyByEventId(EventId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], reply1);
	});

	it("get by guest id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await questionQuery.findByGuestId(GuestId);

		// than
		assert(res.length > 0);
		assert.deepStrictEqual(res[0], question);
	});

	it("delete questionById", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const res = await questionQuery.deleteById(question.id);

		assert(res > 0);

		const ret = await models.Question.findOne({where: {id: question.id}});

		assert.equal(ret, null);
	});

	it("update question by id", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});
		const newContent = "new new content";

		// when
		const res = await questionQuery.updateById({
			content: newContent,
			id: question.id,
		});

		assert(res > 0);

		const ret = (
			await models.Question.findOne({where: {id: question.id}})
		).get({plain: true});

		assert.equal(ret.content, newContent);
	});

	it("updateQuestionIsStared", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const question1 = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		const question2 = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		await questionQuery.updateQuestionIsStared({
			from: question1.id,
			to: question2.id,
		});

		// than
		const q1 = await questionQuery.findById(question1.id);
		const q2 = await questionQuery.findById(question2.id);

		assert.equal(q1.isStared, false);
		assert.equal(q2.isStared, true);
	});

	it("getQuestionById", async () => {
		// given
		const EventId = null;
		const GuestId = null;
		const QuestionId = null;
		const content = "question question";

		const createdQuestion = await questionQuery.create({
			EventId,
			content,
			GuestId,
			QuestionId,
		});

		// when
		const question = await questionQuery.findById(
			createdQuestion.id,
		);

		// than
		assert.deepStrictEqual(createdQuestion, question);
	});
});
