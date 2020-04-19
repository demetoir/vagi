import {Op} from "sequelize";
import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";
import {QUESTION_STATE_ACTIVE} from "../../../constants/questionState.js";
import logger from "../../logger.js";

export default class QuestionQuery extends AbstractModelQuery {
	/**
	 *
	 * @param EventId <number|null>
	 * @param content <String>
	 * @param GuestId <number|null>
	 * @param QuestionId <number|null>
	 * @param state <String|null>
	 * @returns {Promise<object>}
	 */
	async create({
		EventId,
		content,
		GuestId,
		QuestionId,
		state = QUESTION_STATE_ACTIVE,
	}) {
		const res = await this.models.Question.create({
			content,
			EventId,
			GuestId,
			QuestionId,
			state,
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param EventId {number|null}
	 * @returns {Promise<object[]>}
	 */
	async findByEventId(EventId) {
		const res = await this.models.Question.findAll({
			where: {EventId},
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param id {number}
	 * @returns {Promise<object|null>}
	 */
	async findById(id) {
		const res = await this.models.Question.findOne({where: {id}});

		return plainOne(res);
	}

	/**
	 *
	 * @param EventId {number|null}
	 * @returns {Promise<object[]>}
	 */
	async findReplyByEventId(EventId) {
		const res = await this.models.Question.findAll({
			where: {EventId, QuestionId: {[Op.ne]: null}},
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param GuestId <number|null>
	 * @returns {Promise<object[]>}
	 */
	async findByGuestId(GuestId) {
		const res = await this.models.Question.findAll({
			where: {GuestId},
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param id {number}
	 * @returns {Promise<number>}
	 */
	async deleteById(id) {
		return this.models.Question.destroy({where: {id}});
	}

	/**
	 *
	 * @param id <number>
	 * @param content <string|undefined>
	 * @param state <string>
	 * @param isStared <Boolean>
	 * @returns {Promise<number>}
	 */
	async updateById({id, content, state, isStared}) {
		return this.models.Question.update(
			{
				content,
				state,
				isStared,
			},
			{where: {id}},
		);
	}

	// todo rename
	/**
	 *
	 * @param from <number>
	 * @param to <number>
	 * @returns {Promise<void>}
	 */
	async updateQuestionIsStared({from, to}) {
		// todo simplify transaction
		const transaction = await this.models.sequelize.transaction();

		try {
			if (from) {
				await this.models.Question.update(
					{isStared: false},
					{where: {id: from}},
					{transaction},
				);
			}

			await this.models.Question.update(
				{isStared: true},
				{where: {id: to}},
				{transaction},
			);

			await transaction.commit();
		} catch (err) {
			if (transaction) {
				await transaction.rollback();
			}

			logger.error("Transaction rollback", err);
		}
	}

	// todo implement test code
	async updateQuestionsByStateAndEventId({from, to, EventId}) {
		return this.models.Question.update(
			{state: to},
			{where: {state: from, EventId}},
		);
	}
}
