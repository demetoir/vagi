import {findHostByOAuthId} from "../../DB/queries/host.js";
import logger from "../logger.js";
import {AUTHORITY_TYPE_GUEST, AUTHORITY_TYPE_HOST} from "../../constants/authorityTypes.js";

async function onHost(sub) {
	const hostInfo = await findHostByOAuthId(sub);

	return {sub: AUTHORITY_TYPE_HOST, info: hostInfo};
}

function onGuest(sub) {
	return {sub: AUTHORITY_TYPE_GUEST, info: sub};
}

const authenticate = async (resolve, root, args, context, info) => {
	// todo refactoring here
	const audience = context.payload && context.payload.aud;
	const sub = context.payload.sub;
	let authority = {sub: null, info: null};


	switch (audience) {
		case AUTHORITY_TYPE_HOST: {
			authority = await onHost(sub);
			break;
		}
		case AUTHORITY_TYPE_GUEST: {
			authority = onGuest(sub);
			break;
		}
		default: {
			logger.error(`unexpected type of audience ${audience}`);
		}
	}

	return resolve(root, args, authority, info);
};

export default authenticate;
