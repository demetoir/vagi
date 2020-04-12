import AbstractModelQuery from "../AbstructModelQuery.js";

export default class HostQuery extends AbstractModelQuery {
	/**
	 *
	 * @param oauthId {String}
	 * @returns {Promise<Model<any, any>|any>}
	 */
	async findByOAuthId(oauthId) {
		let res = await this.models.Host.findOne({where: {oauthId}});

		if (res !== null) {
			res = res.get({plain: true});
		}

		return res;
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
