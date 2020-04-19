import AbstractModelQuery from "../AbstructModelQuery.js";
import {plainOne} from "../../utils.js";

export default class HostQuery extends AbstractModelQuery {
	/**
	 *
	 * @param oauthId {String}
	 * @returns {Promise<Model<any, any>|any>}
	 */
	async findByOAuthId(oauthId) {
		let res = await this.models.Host.findOne({where: {oauthId}});

		return plainOne(res);
	}

	/**
	 *
	 * @param oauthId {string}
	 * @param name {string|undefined}
	 * @param image {string|undefined}
	 * @param email {string|undefined}
	 * @returns {Promise<object>}
	 */
	async findOrCreatByOAuth({oauthId, name, image, email}) {
		const res = await this.models.Host.findOrCreate({
			where: {oauthId},
			defaults: {name, image, email, emailFeedBack: false},
		});

		return res[0].get({plain: true});
	}
}
