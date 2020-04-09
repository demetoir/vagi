import {Strategy as RealStrategy} from "passport-google-oauth20";
import {Strategy as MockStrategy} from "passport-mocked";
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

const verifyFunc = async (accessToken, refreshToken, profile, cb) => {
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
		logger.error(error, error.stack);
		return cb(error, false);
	}
};

export default function googleStrategy(oAuthArgs) {
	let options = oAuthArgs;

	if (process.env.NODE_ENV === "test") {
		options = {
			...options,
			authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
			name: "google",
		};

		return new MockStrategy(options, verifyFunc);
	} else {
		return new RealStrategy(options, verifyFunc);
	}
}
