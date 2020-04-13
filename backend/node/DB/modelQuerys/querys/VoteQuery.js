import {Op} from "sequelize";
import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";
import logger from "../../logger.js";

export default class VoteQuery extends AbstractModelQuery {
	/**
	 *
	 * @param GuestId {number|null}
	 * @param CandidateId {number|null}
	 * @return {Promise<object>}
	 */
	async create({GuestId, CandidateId}) {
		const res = await this.models.Vote.create({GuestId, CandidateId});

		return plainOne(res);
	}

	/**
	 *
	 * @param id {number}
	 * @return {Promise<Object>}
	 */
	async findById(id) {
		const res = await this.models.Vote.findOne({
			where: {id},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param GuestId {number}
	 * @param CandidateId {number}
	 * @return {Promise<object>}
	 */
	async findBy({GuestId, CandidateId}) {
		const res = await this.models.Vote.findOne({
			where: {GuestId, CandidateId},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param GuestId {number|null}
	 * @param CandidateId {number|null}
	 * @return {Promise<number>} affected rows number
	 */
	async deleteBy({GuestId, CandidateId}) {
		return this.models.Vote.destroy({where: {GuestId, CandidateId}});
	}

	/**
	 *
	 * @param GuestId {number|null}
	 * @param newCandidateId {number|null}
	 * @param oldCandidateId {number|null}
	 * @return {Promise<object>} swapped vote object
	 */
	async swapVoteByGuestId(GuestId, newCandidateId, oldCandidateId) {
		let transaction;

		try {
			// get transaction
			transaction = await this.models.sequelize.transaction();

			// step 1
			const vote = await this.models.Vote.findOne({
				where: {
					GuestId,
					CandidateId: oldCandidateId,
				},
			});

			if (vote === null) {
				throw new Error(
					`vote not exist, where GuestId: ${GuestId} && CandidateId${oldCandidateId}`,
				);
			}

			vote.CandidateId = newCandidateId;
			await vote.save();

			// commit
			await transaction.commit();

			return vote.get({plain: true});
		} catch (err) {
			// Rollback transaction only if the transaction object is defined
			if (transaction) {
				await transaction.rollback();
			}

			logger.error("Transaction rollback", err);

			throw new Error(`transaction fail and rollback of \n${err}`);
		}
	}

	/**
	 *
	 * @param candidateList {number[]}
	 * @param guestId {number|null}
	 * @return {Promise<object[]>}
	 */
	async getCandidatesByGuestId(candidateList, guestId) {
		const res = await this.models.Vote.findAll({
			where: {
				[Op.and]: [
					{GuestId: guestId},
					{
						CandidateId: {
							[Op.or]: candidateList,
						},
					},
				],
			},
			attributes: ["CandidateId"],
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param candidateIds {number[]}
	 * @return {Promise<number>}
	 */
	async getVotersByCandidateIds(candidateIds) {
		return this.models.Vote.count({
			where: {
				CandidateId: {
					[Op.or]: candidateIds,
				},
			},
			distinct: true,
			col: "GuestId",
		});
	}
}
