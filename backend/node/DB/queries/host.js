import models from "../models";

/**
 *
 * @param oauthId {String}
 * @returns {Promise<Model<any, any>|any>}
 */
export async function findHostByOAuthId(oauthId) {
	let res = await models.Host.findOne({where: {oauthId}});

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
export async function findOrCreateHostByOAuth({oauthId, name, image, email}) {
	const res = await models.Host.findOrCreate({
		where: {oauthId},
		defaults: {name, image, email, emailFeedBack: false},
	});

	return res[0].get({plain: true});
}
