import {findHostByOAuthId} from "../../DB/queries/host.js";
import Validator from "./Validator.js";
import hostJWTCookie from "../JWTCookie/hostJWTCookie.js";

/**
 *
 * @param req {express.Request}
 * @return {Promise<(boolean|*)[]|(boolean|{guest: Object, event: (Model<any, any>|any)})[]>}
 */
export default async function validateHostJWTCookie(req) {
	try {
		const payload = hostJWTCookie.verify(req);
		const hostOauthId = payload.oauthId;

		const host = await findHostByOAuthId(hostOauthId);

		Validator.isExistHost(host);

		return [true, host];
	} catch (e) {
		return [false, e];
	}
}
