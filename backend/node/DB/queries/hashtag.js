import models from "../models";
import {plainFindAll, plainOne} from "../utils.js";

/**
 *
 * @param name {string}
 * @param EventId {number|null}
 * @returns {Promise<object>}
 */
export async function createHashtag({name, EventId}) {
	const res = await models.Hashtag.create(
		{name, EventId},
		{default: {updateAt: new Date(), createAt: new Date()}},
	);

	return plainOne(res);
}

/**
 *
 * @param hashTags
 * @return {Promise<Model[]>}
 */
export async function createHashtags(hashTags) {
	const res = await models.Hashtag.bulkCreate(hashTags, {returning: true});

	return plainFindAll(res);
}

/**
 *
 * @param name <string>
 * @param id <number>
 * @returns {Promise<number>}
 */
export async function updateHashtagById({name, id}) {
	return models.Hashtag.update({name}, {where: {id}});
}

/**
 *
 * @param id {number}
 * @returns {Promise<number>}
 */
export async function deleteHashTagById(id) {
	return models.Hashtag.destroy({where: {id}});
}

/**
 *
 * @param EventId {number|null}
 * @returns {Promise<object[]>}
 */
export async function getHashtagByEventId(EventId) {
	const res = await models.Hashtag.findAll({where: {EventId}});

	return plainFindAll(res);
}

/**
 *
 * @param EventIdList {number[]}
 * @returns {Promise<object[]>}
 */
export async function getHashtagByEventIds(EventIdList) {
	const res = await models.Hashtag.findAll({where: {EventId: EventIdList}});

	return plainFindAll(res);
}
