import assert from "assert";
import {describe, it} from "mocha";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {candidateQuery} from "../../../DB/modelQuerys";

describe("candidate DB query api", () => {
	new SequelizeTestHelper().autoSetup();

	it("create", async () => {
		// given
		const number = 1;
		const content = "content";
		const PollId = null;

		// when
		const candidate = await candidateQuery.create({
			content,
			PollId,
			number,
		});

		// than
		assert(candidate.id > 0);
		assert.equal(candidate.number, number);
		assert.equal(candidate.PollId, PollId);
		assert.equal(candidate.content, content);
	});

	it("findByPollIds", async () => {
		// given
		const number = 1;
		const content = "content";
		const PollId = null;
		const candidate = await candidateQuery.create({
			content,
			PollId,
			number,
		});

		// when
		const result = await candidateQuery.findByPollIds([PollId]);

		const expected = [candidate];

		// than
		assert.deepStrictEqual(result, expected);
	});

	it("createBulk", async () => {
		const candidates = [
			{
				number: 1,
				content: "content1",
				PollId: null,
			},
			{
				number: 2,
				content: "content2",
				PollId: null,
			},
		];

		const result = await candidateQuery.createBulk(candidates);

		assert(result.length === 2);
		assert.equal(result[0].number, 1);
		assert.equal(result[0].content, "content1");
		assert.equal(result[0].PollId, null);

		assert.equal(result[1].content, "content2");
		assert.equal(result[1].number, 2);
		assert.equal(result[1].PollId, null);
	});
});
