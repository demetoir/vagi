import models from "../models";
import {plainFindAll, plainOne} from "../utils.js";

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

	return plainOne(res);
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

	return plainFindAll(res);
}
