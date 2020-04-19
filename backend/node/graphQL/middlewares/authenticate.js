import jwt from "jsonwebtoken";
import {findHostByOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";
import {
	AUTHORITY_TYPE_GUEST,
	AUTHORITY_TYPE_HOST,
} from "../../constants/authorityTypes.js";
import config from "../config/config.js";
import {getGuestByGuestSid} from "../../DB/queries/guest.js";
import BearerTokenParser from "../../libs/BearerTokenParser.js";

const authenticate = async (resolver, root, args, context, info) => {
	const jwtToken = BearerTokenParser.parse(context.request);

	if (jwtToken === null) {
		logger.error(`jwt is not found in bearer token`);

		return null;
	}

	const secret = config.tokenArgs.secret;
	let jwtPayload;

	try {
		jwtPayload = jwt.verify(jwtToken, secret);
	} catch (e) {
		logger.error(`jwt malformed`);

		return null;
	}

	const {aud: audience} = jwtPayload;
	let authority;

	switch (audience) {
		case AUTHORITY_TYPE_HOST: {
			const {oauthId} = jwtPayload;

			authority = await findHostByOAuthId(oauthId);

			break;
		}
		case AUTHORITY_TYPE_GUEST: {
			const {guestSid} = jwtPayload;

			authority = await getGuestByGuestSid(guestSid);
			break;
		}
		default: {
			logger.error(`unexpected type of audience ${audience}`);

			return null;
		}
	}

	return resolver(root, args, authority, info);
};

export default authenticate;
