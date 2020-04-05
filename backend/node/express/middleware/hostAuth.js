import config from "../config";
import RedirectOnFailValidate from "./RedirectOnFailValidate.js";
import validateHostJWTCookie from "../validator/validateHostJWTCookie.js";

const {routePage} = config;


/**
 *
 * @return {function}
 */
export default function hostAuth() {
	return RedirectOnFailValidate(validateHostJWTCookie, routePage.main);
}
