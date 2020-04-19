import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";
import logger from "../../logger.js";
import {
	POLL_STATE_CLOSED,
	POLL_STATE_RUNNING,
	POLL_STATE_STAND_BY,
} from "../../../constants/pollState.js";
import {POLL_TYPE_N_ITEMS} from "../../../constants/pollType.js";
import {createBulkCandidates} from "../../queries/candidate.js";

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

export default class PollQuery extends AbstractModelQuery {
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
	async create(
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
		const res = await this.models.Poll.create(
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

		return plainOne(res);
	}

	/**
	 *
	 * @param id {Number|null} poll id
	 * @return {Promise<number>} affected row number
	 */
	async openPoll(id) {
		// result should be == [1], 1개의 row가 성공했다는 의미
		const result = await this.models.Poll.update(
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
	async closePoll(id) {
		const result = await this.models.Poll.update(
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
	async findByEventId(EventId) {
		const res = await this.models.Poll.findAll({
			where: {EventId},
			order: [["id", "DESC"]],
		});

		return plainFindAll(res);
	}

	// todo: refactoring
	// todo add test
	// look for inject transaction object
	// https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries
	async createPollAndCandidates(
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
			transaction = await this.models.sequelize.transaction();

			// step 1
			const poll = await this.create(
				{EventId, pollName, pollType, selectionType, allowDuplication},
				transaction,
			);

			// step 2
			const candidateRows = makeCandidateRows(
				poll.id,
				pollType,
				candidates,
			);

			poll.nItems = await createBulkCandidates(
				candidateRows,
				transaction,
			);

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
}
