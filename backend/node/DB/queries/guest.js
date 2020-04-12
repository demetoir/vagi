import uuidv1 from "uuid/v1";
import models from "../models";
import getRandomGuestName from "../dummy/RandomGuestName";
import {plainFindAll, plainOne} from "../utils.js";

/**
 *
 * @param guestSid {string}
 * @returns {Promise<object|null>}
 */
export async function getGuestByGuestSid(guestSid) {
	const res = await models.Guest.findOne({where: {guestSid}});

	return plainOne(res);
}

/**
 *
 * @param eventId {number|null}
 * @returns {Promise<object>}
 */
export async function createGuest(eventId) {
	const res = await models.Guest.create({
		name: getRandomGuestName(),
		EventId: eventId,
		guestSid: uuidv1(),
		isAnonymous: 1,
	});

	return plainOne(res);
}

/**
 *
 * @param id {number}
 * @returns {Promise<object|null>}
 */
export async function getGuestById(id) {
	const res = await models.Guest.findOne({
		where: {id},
	});

	return plainOne(res);
}

/**
 *
 * @param id {number}
 * @param name {string|undefined}
 * @param isAnonymous {boolean|undefined}
 * @param company {string|undefined}
 * @param email {string|undefined}
 * @returns {Promise<number>}
 */
export async function updateGuestById({id, name, isAnonymous, company, email}) {
	const res = await models.Guest.update(
		{name, company, isAnonymous, email},
		{where: {id}},
	);

	return res[0];
}

/**
 *
 * @param EventId {number}
 * @returns {Promise<Model[]|any[]>}
 */
export async function getGuestsByEventId(EventId) {
	const res = models.Guest.findAll({where: {EventId}});

	return plainFindAll(res);
}
