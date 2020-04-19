import assert from "assert";
import {describe, it} from "mocha";

import SequelizeTestHelper from "../../testHelper/SequelizeTestHelper.js";
import {likeQuery} from "../../../DB/modelQuerys";

describe("LikeQuery", () => {
	new SequelizeTestHelper().autoSetup();

	it("create Like", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;

		// when
		const res = await likeQuery.createLike({QuestionId, GuestId});

		// than

		assert(res.id > 0);
		assert.equal(res.GuestId, GuestId);
		assert.equal(res.QuestionId, QuestionId);
	});

	it("delete Like by ", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;

		await likeQuery.createLike({QuestionId, GuestId});

		// when
		const res = await likeQuery.deleteLikeBy({QuestionId, GuestId});

		// than
		assert.equal(res, 1);
	});

	it("get likes by guest id", async () => {
		// given
		const QuestionId = null;
		const GuestId = null;
		const like = await likeQuery.createLike({QuestionId, GuestId});

		// when
		const res = await likeQuery.getLikesByGuestId(GuestId);

		// than
		assert.equal(res.length, 1);
		assert.deepStrictEqual(res[0], like);
	});
});
