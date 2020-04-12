import Sequelize from "sequelize";
import models from "../models";
import {plainFindAll, plainOne} from "../utils.js";

const Op = Sequelize.Op;

/**
 *
 * @param pollIds {number[]}
 * @return {Promise<object[]>}
 */
export async function getCandidatesByPollIds(pollIds) {
	const res = models.Candidate.findAll({
		where: {
			PollId: {
				[Op.or]: pollIds,
			},
		},
	});

	return plainFindAll(res);
}

/**
 *
 * @param content {String}
 * @param number {Number}
 * @param PollId {Number|null}
 * @return {Promise<Object>} created Candidate object
 */
export async function createCandidate({content, number, PollId}) {
	const res = await models.Candidate.create({content, number, PollId});

	return plainOne(res);
}

/**
 *
 * @param candidates {Object[]}
 * @param transaction {Object|undefined}
 * @return {Promise<Object[]>} bulk created Candidate objects
 */
export async function createBulkCandidates(candidates, transaction) {
	const res = await models.Candidate.bulkCreate(candidates, {transaction});

	return plainFindAll(res);
}
