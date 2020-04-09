import logger from "../logger.js";
import {findOrCreateHostByOAuth} from "../../DB/queries/host.js";

function parseProfile(profile) {
	try {
		let imageUrl = "";

		if (profile.photos && profile.photos.length) {
			imageUrl = profile.photos[0].value;
		}

		return {
			id: profile.id,
			displayName: profile.displayName,
			image: imageUrl,
			email: profile.emails[0].value,
		};
	} catch (e) {
		throw new Error(`can not parser oauth profile`);
	}
}

const googleStrategyVerifyFunc = async (
	accessToken,
	refreshToken,
	profile,
	cb,
) => {
	try {
		const {id, displayName, image, email} = parseProfile(profile);

		logger.info(`google auth id ${id}`);

		const host = await findOrCreateHostByOAuth({
			oauthId: id,
			name: displayName,
			image,
			email,
		});

		return cb(null, host);
	} catch (error) {
		logger.error(error, error.stack);
		return cb(error, false);
	}
};

export default googleStrategyVerifyFunc;
