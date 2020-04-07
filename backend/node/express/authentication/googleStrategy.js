import {Strategy} from "passport-google-oauth20";
import {findOrCreateHostByOAuth} from "../../DB/queries/host.js";
import logger from "../logger.js";

function extractProfile(profile) {
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
}

const verify = async (accessToken, refreshToken, profile, cb) => {
	try {
		const {id, displayName, image, email} = extractProfile(profile);

		logger.info(`google auth id ${id}`);

		const host = await findOrCreateHostByOAuth({
			oauthId: id,
			name: displayName,
			image,
			email,
		});

		return cb(null, host);
	} catch (error) {
		logger.error(error);
		return null;
	}
};

export default function googleStrategy(oAuthArgs) {
	return new Strategy({...oAuthArgs}, verify);
}
