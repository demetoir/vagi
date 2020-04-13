import sequelize from "sequelize";
import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";

export default class EmojiQuery extends AbstractModelQuery {
	/**
	 *
	 * @param GuestId fk to guest table
	 * @param QuestionId fk to question table
	 * @param name name of emoji
	 * @param EventId fk to event table
	 * @returns {Promise<object>}
	 */
	async create({name, GuestId, QuestionId, EventId}) {
		const res = await this.models.Emoji.create({
			GuestId,
			QuestionId,
			name,
			EventId,
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param id {number}
	 * @return {Promise<object>}
	 */
	async findById(id) {
		const res = await this.models.Emoji.findOne({
			where: {id},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param name {string}
	 * @param QuestionId {number|null}
	 * @param GuestId {number|null}
	 * @return {Promise<object>}
	 */
	async findBy({name, QuestionId, GuestId}) {
		const res = await this.models.Emoji.findOne({
			where: {name, QuestionId, GuestId},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param id id of emoji
	 * @returns {Promise<Number>}
	 */
	async deleteById(id) {
		return this.models.Emoji.destroy({
			where: {id},
		});
	}

	/**
	 *
	 * @param name name of emoji
	 * @param GuestId fk to guest table
	 * @param QuestionId fk to question table
	 * @returns {Promise<Number>}
	 */
	async deleteBy({name, GuestId, QuestionId}) {
		return this.models.Emoji.destroy({where: {name, GuestId, QuestionId}});
	}

	/**
	 *
	 * @param name name of emoji
	 * @param QuestionId fk to question table
	 * @param GuestId fk to guest table
	 * @returns {Promise<object[]>}
	 */
	async getDidIPicked({name, QuestionId, GuestId}) {
		const res = await this.models.Emoji.findAll({
			where: {name, QuestionId, GuestId},
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param name name of emoji
	 * @param QuestionId fk to question table
	 * @returns {Promise<number>}
	 */
	async getCountBy({name, QuestionId}) {
		return this.models.Emoji.count({where: {name, QuestionId}});
	}

	/**
	 *
	 * @param EventId fk to event table
	 * @returns {Promise<object[]>}
	 */
	async getEmojiCountByEventIdGroupByQuestionId({EventId}) {
		const res = await this.models.Emoji.findAll({
			attributes: [
				"QuestionId",
				"name",
				[sequelize.fn("count", "id"), "count"],
				[sequelize.literal("MIN(createdAt)"), "createdAt"],
			],
			where: {EventId},
			group: ["QuestionId", "name"],
		});

		// raw: true 하는 방식은 timestamp가 정수형 String(ex "12312412412414") 타입으로 반환된다.
		// 따라서 await 한뒤 plain: true 방식으로 해야하 Date object type 으로 반환한ㄷ.
		return plainFindAll(res);
	}

	/**
	 *
	 * @param GuestId fk to guest table
	 * @param EventId fk to event table
	 * @returns {Promise<object[]>}
	 */
	async getEmojiPick({GuestId, EventId}) {
		const res = await this.models.Emoji.findAll({
			where: {GuestId, EventId},
			attributes: ["name", "QuestionId"],
		});

		return plainFindAll(res);
	}
}
