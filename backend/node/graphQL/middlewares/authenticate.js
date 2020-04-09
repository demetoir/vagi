import jwt from "jsonwebtoken";
import {findHostByOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";
import {
	AUTHORITY_TYPE_GUEST,
	AUTHORITY_TYPE_HOST,
} from "../../constants/authorityTypes.js";
import config from "../config/config.js";
import {getGuestByGuestSid} from "../../DB/queries/guest.js";

const authenticate = async (resolve, root, args, context, info) => {
	const jwtToken = context.request.headers.authorization;
	const secret = config.tokenArgs.secret;
	const jwtPayload = jwt.verify(jwtToken, secret);
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
		}
	}

	return resolve(root, args, authority, info);
};

export default authenticate;
