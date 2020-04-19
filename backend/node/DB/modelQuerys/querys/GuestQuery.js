import uuidv1 from "uuid/v1.js";
import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainFindAll, plainOne} from "../../utils.js";
import getRandomGuestName from "../../../libs/RandomNameGenerator";

export default class GuestQuery extends AbstractModelQuery {
	/**
	 *
	 * @param eventId {number|null}
	 * @returns {Promise<object>}
	 */
	async create(eventId) {
		const res = await this.models.Guest.create({
			name: getRandomGuestName.generate(),
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
	async findById(id) {
		const res = await this.models.Guest.findOne({
			where: {id},
		});

		return plainOne(res);
	}

	/**
	 *
	 * @param guestSid {string}
	 * @returns {Promise<object|null>}
	 */
	async findByGuestSid(guestSid) {
		const res = await this.models.Guest.findOne({where: {guestSid}});

		return plainOne(res);
	}

	/**
	 *
	 * @param EventId {number|null}
	 * @returns {Promise<Model[]|any[]>}
	 */
	async findByEventId(EventId) {
		const res = this.models.Guest.findAll({where: {EventId}});

		return plainFindAll(res);
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
	async updateById({id, name, isAnonymous, company, email}) {
		const res = await this.models.Guest.update(
			{name, company, isAnonymous, email},
			{where: {id}},
		);

		return res[0];
	}
}
