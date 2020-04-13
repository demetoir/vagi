import models from "../models";
import {plainFindAll, plainOne} from "../utils.js";

/**
 *
 * @returns {Promise<object[]>}
 */
export async function getAllEvents() {
	const res = await models.Event.findAll();

	return plainFindAll(res);
}

/**
 *
 * @param eventName {String}
 * @param eventCode {String}
 * @param HostId {number|null}
 * @param moderationOption {boolean|undefined}
 * @param replyOption {boolean|undefined}
 * @param startAt {Date}
 * @param endAt {Date}
 * @returns {Promise<object>}
 */
export async function findOrCreateEvent({
	eventName,
	eventCode,
	HostId,
	moderationOption = false,
	replyOption = false,
	startAt = new Date(),
	endAt = new Date(),
}) {
	const res = await models.Event.findOrCreate({
		where: {eventCode},
		defaults: {
			eventName,
			HostId,
			moderationOption,
			replyOption,
			startAt,
			endAt,
		},
	});

	return res[0].get({plain: true});
}

/**
 *
 * @param id {number}
 * @param eventName {string|undefined}
 * @param moderationOption {boolean|undefined}
 * @param replyOption {boolean|undefined}
 * @param startAt {Date|undefined}
 * @param endAt {Date|undefined}
 * @returns {Promise<Number>}
 */
export async function updateEventById({
	id,
	eventName,
	moderationOption,
	replyOption,
	startAt,
	endAt,
}) {
	const res = await models.Event.update(
		{eventName, moderationOption, replyOption, startAt, endAt},
		{where: {id}},
	);

	return res[0];
}

/**
 *
 * @param hostId {number|null}
 * @returns {Promise<object[]>}
 */
export async function getEventsByHostId(hostId) {
	const res = models.Event.findAll({
		where: {HostId: hostId},
	});

	return plainFindAll(res);
}

/**
 *
 * @param eventCode {string}
 * @returns {Promise<Object|null>}
 */
export async function getEventByEventCode(eventCode) {
	const res = await models.Event.findOne({
		where: {
			eventCode,
		},
	});

	return plainOne(res);
}

/**
 *
 * @param id {number}
 * @returns {Promise<Model<any, any>|null|any>}
 */
export async function getEventById(id) {
	const res = await models.Event.findOne({
		where: {
			id,
		},
	});

	return plainOne(res);
}

/**
 *
 * @param id {number}
 * @returns {Promise<object|null>}
 */
export async function getEventOptionByEventId(id) {
	const res = await models.Event.findOne({
		where: {
			id,
		},
		attributes: ["moderationOption", "replyOption"],
	});

	return plainOne(res);
}
