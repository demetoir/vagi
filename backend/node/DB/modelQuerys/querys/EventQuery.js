import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne, plainFindOrCreate} from "../../utils.js";

export default class EventQuery extends AbstractModelQuery {
	/**
	 *
	 * @param id
	 * @return {Promise<object||null>}
	 */
	async findOneById(id) {
		const res = await this.models.Event.findOne({
			where: {
				id,
			},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @returns {Promise<object[]>}
	 */
	async getAllEvents() {
		const res = await this.models.Event.findAll();

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
	async findOrCreateEvent({
		eventName,
		eventCode,
		HostId,
		moderationOption = false,
		replyOption = false,
		startAt = new Date(),
		endAt = new Date(),
	}) {
		const res = await this.models.Event.findOrCreate({
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

		return plainFindOrCreate(res);
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
	async updateEventById({
		id,
		eventName,
		moderationOption,
		replyOption,
		startAt,
		endAt,
	}) {
		const res = await this.models.Event.update(
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
	async getEventsByHostId(hostId) {
		const res = this.models.Event.findAll({
			where: {HostId: hostId},
		});

		return plainFindAll(res);
	}

	/**
	 *
	 * @param eventCode {string}
	 * @returns {Promise<Object|null>}
	 */
	async getEventByEventCode(eventCode) {
		const res = await this.models.Event.findOne({
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
	async getEventById(id) {
		const res = await this.models.Event.findOne({
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
	async getEventOptionByEventId(id) {
		const res = await this.models.Event.findOne({
			where: {
				id,
			},
			attributes: ["moderationOption", "replyOption"],
		});

		return plainOne(res);
	}
}
