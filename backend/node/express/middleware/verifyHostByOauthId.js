import {findHostByOAuthId} from "../../DB/queries/host.js";
import VerifyHostError from "./VerifyHostError.js";

/**
 *
 * @param hostOauthId
 */
export default async function verifyHostByOauthId(hostOauthId) {
	const host = await findHostByOAuthId(hostOauthId);

	if (host === null) {
		throw new VerifyHostError(`존재하지않는 host`);
	}
}
