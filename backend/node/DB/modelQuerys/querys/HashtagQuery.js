import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";

export default class HashtagQuery extends AbstractModelQuery {
	/**
	 *
	 * @param name {string}
	 * @param EventId {number|null}
	 * @returns {Promise<object>}
	 */
	async create({name, EventId}) {
		const res = await this.models.Hashtag.create(
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
	async createBulk(hashTags) {
		const res = await this.models.Hashtag.bulkCreate(hashTags, {
			returning: true,
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param name <string>
	 * @param id <number>
	 * @returns {Promise<number>}
	 */
	async updateById({name, id}) {
		return this.models.Hashtag.update({name}, {where: {id}});
	}

	/**
	 *
	 * @param id {number}
	 * @returns {Promise<number>}
	 */
	async deleteById(id) {
		return this.models.Hashtag.destroy({where: {id}});
	}

	/**
	 *
	 * @param EventId {number|null}
	 * @returns {Promise<object[]>}
	 */
	async findByEventId(EventId) {
		const res = await this.models.Hashtag.findAll({where: {EventId}});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param EventIdList {number[]}
	 * @returns {Promise<object[]>}
	 */
	async findByEventIds(EventIdList) {
		const res = await this.models.Hashtag.findAll({
			where: {EventId: EventIdList},
		});

		return plainFindAll(res);
	}
}
