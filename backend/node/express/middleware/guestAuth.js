import config from "../config";
import validateGuestJWT from "../validator/validateGuestJWT.js";
import RedirectOnFailValidate from "./RedirectOnFailValidate.js";

const {routePage} = config;


/**
 *
 * @return {function}
 */
export default function guestAuth() {
	return RedirectOnFailValidate(validateGuestJWT, routePage.main);
}
