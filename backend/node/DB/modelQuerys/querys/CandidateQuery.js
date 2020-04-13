import {Op} from "sequelize";
import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";

export default class HashtagQuery extends AbstractModelQuery {
	/**
	 *
	 * @param content {String}
	 * @param number {Number}
	 * @param PollId {Number|null}
	 * @return {Promise<Object>} created Candidate object
	 */
	async create({content, number, PollId}) {
		const res = await this.models.Candidate.create({
			content,
			number,
			PollId,
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param candidates {Object[]}
	 * @param transaction {Object|undefined}
	 * @return {Promise<Object[]>} bulk created Candidate objects
	 */
	async createBulk(candidates, transaction) {
		const res = await this.models.Candidate.bulkCreate(candidates, {
			transaction,
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param pollIds {number[]}
	 * @return {Promise<object[]>}
	 */
	async findByPollIds(pollIds) {
		const res = this.models.Candidate.findAll({
			where: {
				PollId: {
					[Op.or]: pollIds,
				},
			},
		});

		return plainFindAll(res);
	}
}
