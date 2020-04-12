import models from "../models";
import {plainOne} from "../utils.js";

/**
 *
 * @param oauthId {String}
 * @returns {Promise<Model<any, any>|any>}
 */
export async function findHostByOAuthId(oauthId) {
	const res = await models.Host.findOne({where: {oauthId}});

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
export async function findOrCreateHostByOAuth({oauthId, name, image, email}) {
	const res = await models.Host.findOrCreate({
		where: {oauthId},
		defaults: {name, image, email, emailFeedBack: false},
	});

	return res[0].get({plain: true});
}

export async function createHost({
	oauthId,
	name,
	image,
	email,
	emailFeedBack = false,
}) {
	const res = await models.Host.create({
		oauthId,
		name,
		image,
		email,
		emailFeedBack,
	});

	return plainOne(res);
}
