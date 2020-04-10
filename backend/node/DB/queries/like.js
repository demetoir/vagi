import models from "../models";

/**
 *
 * @param GuestId {number|null}
 * @param QuestionId {number|null}
 * @returns {Promise<object>}
 */
export async function createLike({GuestId, QuestionId}) {
	const res = await models.Like.create({
		GuestId,
		QuestionId,
	});

	return res.get({plain: true});
}

/**
 *
 * @param GuestId {number|null}
 * @param QuestionId {number|null}
 * @returns {Promise<number>}
 */
export async function deleteLikeBy({GuestId, QuestionId}) {
	return models.Like.destroy({where: {GuestId, QuestionId}});
}

/**
 *
 * @param GuestId {number|null}
 * @returns {Promise<Object[]>}
 */
export async function getLikesByGuestId(GuestId) {
	const res = await models.Like.findAll({
		where: {GuestId},
	});

	return res.map(x => x.get({plain: true}));
}
