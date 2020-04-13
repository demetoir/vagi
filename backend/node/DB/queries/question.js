import Sequelize from "sequelize";
import models from "../models";
import logger from "../logger.js";
import {QUESTION_STATE_ACTIVE} from "../../constants/questionState.js";
import {plainFindAll, plainOne} from "../utils.js";

const sequelize = models.sequelizeSingleton;
const Op = Sequelize.Op;

/**
 *
 * @param EventId <number|null>
 * @param content <String>
 * @param GuestId <number|null>
 * @param QuestionId <number|null>
 * @param state <String|null>
 * @returns {Promise<object>}
 */
export async function createQuestion({
	EventId,
	content,
	GuestId,
	QuestionId,
	state = QUESTION_STATE_ACTIVE,
}) {
	const res = await models.Question.create({
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
export async function getQuestionsByEventId(EventId) {
	const res = await models.Question.findAll({
		where: {EventId},
	});

	return plainFindAll(res);
}

/**
 *
 * @param EventId {number|null}
 * @returns {Promise<object[]>}
 */
export async function getQuestionReplyByEventId(EventId) {
	const res = await models.Question.findAll({
		where: {EventId, QuestionId: {[Op.ne]: null}},
	});

	return plainFindAll(res);
}

/**
 *
 * @param GuestId <number|null>
 * @returns {Promise<object[]>}
 */
export async function getQuestionByGuestId(GuestId) {
	const res = await models.Question.findAll({
		where: {GuestId},
	});

	return plainFindAll(res);
}

/**
 *
 * @param id {number}
 * @returns {Promise<number>}
 */
export async function deleteQuestionById(id) {
	return models.Question.destroy({where: {id}});
}

/**
 *
 * @param id <number>
 * @param content <string|undefined>
 * @param state <string>
 * @param isStared <Boolean>
 * @returns {Promise<number>}
 */
export async function updateQuestionById({id, content, state, isStared}) {
	return models.Question.update(
		{
			content,
			state,
			isStared,
		},
		{where: {id}},
	);
}

/**
 *
 * @param from <number>
 * @param to <number>
 * @returns {Promise<void>}
 */
export async function updateQuestionIsStared({from, to}) {
	// todo simplify transaction
	const transaction = await sequelize.transaction();

	try {
		if (from) {
			await models.Question.update(
				{isStared: false},
				{where: {id: from}},
				{transaction},
			);
		}

		await models.Question.update(
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

/**
 *
 * @param id {number}
 * @returns {Promise<object|null>}
 */
export async function getQuestionById(id) {
	const res = await models.Question.findOne({where: {id}});

	return plainOne(res);
}

// todo implement test code
export async function updateQuestionsByStateAndEventId({from, to, EventId}) {
	return models.Question.update({state: to}, {where: {state: from, EventId}});
}
