import Sequelize from "sequelize";
import models from "../models";
import logger from "../logger.js";

const sequelize = models.sequelizeSingleton;
const Op = Sequelize.Op;

/**
 *
 * @param GuestId {number|null}
 * @param CandidateId {number|null}
 * @return {Promise<object>}
 */
export async function addVote({GuestId, CandidateId}) {
	const result = await models.Vote.create({GuestId, CandidateId});

	return result.get({plain: true});
}

/**
 *
 * @param GuestId {number|null}
 * @param CandidateId {number|null}
 * @return {Promise<number>} affected rows number
 */
export async function deleteVoteBy({GuestId, CandidateId}) {
	return models.Vote.destroy({where: {GuestId, CandidateId}});
}

/**
 *
 * @param GuestId {number|null}
 * @param newCandidateId {number|null}
 * @param oldCandidateId {number|null}
 * @return {Promise<object>} swapped vote object
 */
export async function swapVoteByGuestId(
	GuestId,
	newCandidateId,
	oldCandidateId,
) {
	let transaction;

	try {
		// get transaction
		transaction = await sequelize.transaction();

		// step 1
		const vote = await models.Vote.findOne({
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
export async function getCandidatesByGuestId(candidateList, guestId) {
	const result = await models.Vote.findAll({
		where: {
			[Op.and]: [
				{GuestId: guestId}, {
					CandidateId: {
						[Op.or]: candidateList,
					},
				},
			],
		},
		attributes: ["CandidateId"],
	});

	return result.map(x => x.get({plain: true}));
}

/**
 *
 * @param candidateIds {number[]}
 * @return {Promise<number>}
 */
export async function getVotersByCandidateIds(candidateIds) {
	return models.Vote.count({
		where: {
			CandidateId: {
				[Op.or]: candidateIds,
			},
		},
		distinct: true,
		col: "GuestId",
	});
}
