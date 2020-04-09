import models from "../models";
import logger from "../logger.js";
import {createBulkCandidates} from "./candidate.js";
import {
	POLL_STATE_CLOSED,
	POLL_STATE_RUNNING,
	POLL_STATE_STAND_BY,
} from "../../constants/pollState.js";
import {POLL_TYPE_N_ITEMS} from "../../constants/pollType.js";

const sequelize = models.sequelize;
// noinspection JSUnresolvedVariable
const Poll = models.Poll;

/**
 *
 * @param id {Number|null} poll id
 * @return {Promise<number>} affected row number
 */
export async function openPoll(id) {
	// result should be == [1], 1개의 row가 성공했다는 의미
	const result = await Poll.update(
		{
			state: POLL_STATE_RUNNING,
			pollDate: new Date(),
		},
		{
			where: {id},
		},
	);

	return result[0];
}

/**
 *
 * @param id {Number|null} poll id
 * @return {Promise<number>} affected row number
 */
export async function closePoll(id) {
	// result should be == [1], 1개의 row가 성공했다는 의미
	const result = await Poll.update(
		{
			state: POLL_STATE_CLOSED,
		},
		{
			where: {id},
		},
	);

	return result[0];
}

/**
 *
 * @param EventId
 * @return {Promise<Object[]>}
 */
export async function getPollsByEventId(EventId) {
	const res = await Poll.findAll({
		where: {EventId},
		order: [["id", "DESC"]],
	});

	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param EventId {Number|null}
 * @param pollName {String}
 * @param pollType {String}
 * @param selectionType {String}
 * @param allowDuplication {Boolean}
 * @param state {String}
 * @param pollDate {Date}
 * @param transaction
 * @return {Promise<Object>} created poll object
 */
export async function createPoll(
	{
		EventId,
		pollName,
		pollType,
		selectionType,
		allowDuplication,
		state = POLL_STATE_STAND_BY,
		pollDate = new Date(),
	},
	transaction = undefined,
) {
	const result = await Poll.create(
		{
			EventId,
			pollName,
			pollType,
			selectionType,
			allowDuplication,
			state,
			pollDate,
		},
		{transaction},
	);

	return result.get({plain: true});
}

// todo: refactoring
// todo add test
const makeCandidateRows = (id, pollType, candidates) => {
	let i = 0;
	const nItems = [];

	for (const value of candidates) {
		nItems.push({
			PollId: id,
			number: i,
			content:
				pollType === POLL_TYPE_N_ITEMS ? value : (i + 1).toString(),
		});
		i++;
	}

	return nItems;
};

// todo: refactoring
// todo add test
// look for inject transaction object
// https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries
export async function createPollAndCandidates(
	EventId,
	pollName,
	pollType,
	selectionType,
	allowDuplication,
	candidates,
) {
	let transaction;

	try {
		// get transaction
		transaction = await sequelize.transaction();

		// step 1
		const poll = await createPoll(
			{EventId, pollName, pollType, selectionType, allowDuplication},
			transaction,
		);

		// step 2
		const candidateRows = makeCandidateRows(poll.id, pollType, candidates);

		poll.nItems = await createBulkCandidates(candidateRows, transaction);

		// commit
		await transaction.commit();

		return poll;
	} catch (err) {
		// Rollback transaction only if the transaction object is defined
		if (transaction) {
			await transaction.rollback();
		}

		logger.error("Transaction rollback", err);

		return null;
	}
}
