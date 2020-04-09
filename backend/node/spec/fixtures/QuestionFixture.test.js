import assert from "assert";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../testHelper/SequelizeTestHelper.js";
import {getQuestionById} from "../../DB/queries/question.js";
import QuestionFixture from "./QuestionFixture.js";
import EventFixtures from "./EventFixtures.js";
import GuestFixtures from "./GuestFixtures.js";

describe(`question fixture`, () => {
	new SequelizeTestHelper().autoSetup();

	describe("create", () => {
		it("with out args", async () => {
			const question = await QuestionFixture.question();

			const real = await getQuestionById(question.id);

			assert.deepStrictEqual(question, real);
			assert.equal(question.EventId, null);
			assert.equal(question.GuestId, null);
		});

		it("with EventId", async () => {
			const event = await EventFixtures.activeEvent();

			const question = await QuestionFixture.question({event});

			const real = await getQuestionById(question.id);

			assert.deepStrictEqual(question, real);
			assert.equal(question.EventId, event.id);
			assert.equal(question.GuestId, null);
		});

		it("with GuestId", async () => {
			const guest = await GuestFixtures.guest({});
			const question = await QuestionFixture.question({guest});

			const real = await getQuestionById(question.id);

			assert.deepStrictEqual(question, real);
			assert.equal(question.EventId, null);
			assert.equal(question.GuestId, guest.id);
		});

		it("with EventID, GuestID", async () => {
			const event = await EventFixtures.activeEvent({});
			const guest = await GuestFixtures.guest(event);
			const question = await QuestionFixture.question({event, guest});

			const real = await getQuestionById(question.id);

			assert.deepStrictEqual(question, real);
			assert.equal(question.EventId, event.id);
			assert.equal(question.GuestId, guest.id);
		});
	});
});
