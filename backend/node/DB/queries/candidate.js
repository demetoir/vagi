import Sequelize from "sequelize";
import models from "../models";

const Op = Sequelize.Op;
const Candidate = models.Candidate;

/**
 *
 * @param pollIds {number[]}
 * @return {Promise<object[]>}
 */
export async function getCandidatesByPollIds(pollIds) {
	const result = models.Candidate.findAll({
		where: {
			PollId: {
				[Op.or]: pollIds,
			},
		},
	});

	return result.map(x => x.get({plain: true}));
}

/**
 *
 * @param content {String}
 * @param number {Number}
 * @param PollId {Number|null}
 * @return {Promise<Object>} created Candidate object
 */
export async function createCandidate({content, number, PollId}) {
	const result = await Candidate.create({content, number, PollId});

	return result.get({plain: true});
}

/**
 *
 * @param candidates {Object[]}
 * @param transaction {Object|undefined}
 * @return {Promise<Object[]>} bulk created Candidate objects
 */
export async function createBulkCandidates(candidates, transaction) {
	const result = await Candidate.bulkCreate(candidates, {transaction});

	return result.map(x => x.get({plain: true}));
}
