import assert from "assert";
import {describe, it} from "mocha";
import {createCandidate} from "../../../DB/queries/candidate.js";
import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {voteQuery} from "../../../DB/modelQuerys";
import GuestFixtures from "../../fixtures/GuestFixtures.js";

describe("vote DB query api", () => {
	new SequelizeTestHelper().autoSetup();

	it(`addVote`, async () => {
		// given
		const guest = await GuestFixtures.guest();

		const PollId = null;
		const content = "content";
		const number = 3;
		const candidate = await createCandidate({content, number, PollId});

		const GuestId = guest.id;
		const CandidateId = candidate.id;

		// when
		const vote = await voteQuery.create({GuestId, CandidateId});

		// than
		assert.equal(vote.CandidateId, CandidateId);
		assert.equal(vote.GuestId, GuestId);
	});

	it(`deleteVoteBy`, async () => {
		// given
		const guest = await GuestFixtures.guest();

		const PollId = null;
		const content = "content";
		const number = 3;
		const candidate = await createCandidate({content, number, PollId});

		const GuestId = guest.id;
		const CandidateId = candidate.id;

		const existVote = await voteQuery.create({GuestId, CandidateId});

		// when
		const affectedRows = await voteQuery.deleteBy({GuestId, CandidateId});

		// than
		assert.equal(affectedRows, 1);

		console.log({GuestId, CandidateId});

		const expectAsNull = await voteQuery.findBy({GuestId, CandidateId});

		assert.equal(expectAsNull, null);
	});

	it(`swapVoteByGuestId`, async () => {
		// given
		const guest = await GuestFixtures.guest();

		const PollId = null;
		const content1 = "content1";
		const number1 = 3;
		const candidate1 = await createCandidate({
			content: content1,
			number: number1,
			PollId,
		});

		const content2 = "content2";
		const number2 = 3;
		const candidate2 = await createCandidate({
			content: content2,
			number: number2,
			PollId,
		});

		const GuestId = guest.id;
		const CandidateIdToDelete = candidate1.id;
		const CandidateIdToAdd = candidate2.id;

		const vote = await voteQuery.create({
			GuestId,
			CandidateId: CandidateIdToDelete,
		});

		// when
		const swappedVote = await voteQuery.swapVoteByGuestId(
			GuestId,
			CandidateIdToAdd,
			CandidateIdToDelete,
		);

		// than
		// expect swapped vote should be update CandidateId only
		assert.equal(swappedVote.CandidateId, CandidateIdToAdd);
		assert.equal(swappedVote.GuestId, GuestId);
		assert.deepStrictEqual(swappedVote.createdAt, vote.createdAt);

		// expect create new vote
		const createdVote = await voteQuery.findBy({
			GuestId,
			CandidateId: CandidateIdToAdd,
		});

		assert.equal(createdVote.GuestId, GuestId);
		assert.equal(createdVote.CandidateId, CandidateIdToAdd);

		// expect delete old vote
		const deletedVote = await voteQuery.findBy({
			GuestId,
			CandidateId: CandidateIdToDelete,
		});

		assert.equal(deletedVote, null);
	});

	it(`getCandidatesByGuestId`, async () => {
		// given
		const guest = await GuestFixtures.guest();

		const PollId = null;
		const content1 = "content1";
		const number1 = 3;
		const candidate1 = await createCandidate({
			content: content1,
			number: number1,
			PollId,
		});

		const GuestId = guest.id;
		const CandidateIdToDelete = candidate1.id;

		await voteQuery.create({GuestId, CandidateId: CandidateIdToDelete});

		// when
		const candidates = await voteQuery.getCandidatesByGuestId(
			[CandidateIdToDelete],
			GuestId,
		);

		// than
		const expected = [{CandidateId: CandidateIdToDelete}];

		assert.deepStrictEqual(candidates, expected);
	});

	it(`getVotersByCandidateIds`, async () => {
		// given
		const guest = await GuestFixtures.guest();

		const PollId = null;
		const content1 = "content1";
		const number1 = 3;
		const candidate1 = await createCandidate({
			content: content1,
			number: number1,
			PollId,
		});

		const GuestId = guest.id;
		const CandidateIdToDelete = candidate1.id;

		await voteQuery.create({GuestId, CandidateId: CandidateIdToDelete});

		// when
		const voters = await voteQuery.getVotersByCandidateIds([
			CandidateIdToDelete,
		]);

		// than
		const expected = 1;

		assert.equal(voters, expected);
	});
});
