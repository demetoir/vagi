import models from "../models";

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

	return res.get({plain: true});
}

/**
 *
 * @param hashTags
 * @return {Promise<Model[]>}
 */
export async function createHashtags(hashTags) {
	const res = await models.Hashtag.bulkCreate(hashTags, {returning: true});

	return res.map(x => x.get({plain: true}));
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

	return res.map(x => x.get({plain: true}));
}

/**
 *
 * @param EventIdList {number[]}
 * @returns {Promise<object[]>}
 */
export async function getHashtagByEventIds(EventIdList) {
	const res = await models.Hashtag.findAll({where: {EventId: EventIdList}});

	return res.map(x => x.get({plain: true}));
}
