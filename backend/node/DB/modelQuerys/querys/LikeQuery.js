import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";

export default class LikeQuery extends AbstractModelQuery {
	/**
	 *
	 * @param GuestId {number|null}
	 * @param QuestionId {number|null}
	 * @returns {Promise<object>}
	 */
	async createLike({GuestId, QuestionId}) {
		const res = await this.models.Like.create({
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
	async deleteLikeBy({GuestId, QuestionId}) {
		return this.models.Like.destroy({where: {GuestId, QuestionId}});
	}

	/**
	 *
	 * @param GuestId {number|null}
	 * @returns {Promise<Object[]>}
	 */
	async getLikesByGuestId(GuestId) {
		const res = await this.models.Like.findAll({
			where: {GuestId},
		});

		return plainFindAll(res);
	}
}
