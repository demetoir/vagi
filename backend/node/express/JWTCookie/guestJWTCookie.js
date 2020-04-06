import {AUTHORITY_TYPE_GUEST} from "../../constants/authorityTypes.js";
import CookieKeys from "../CookieKeys.js";
import {JWTCookie} from "./JWTCookie.js";
import config from "../config";

const {tokenArgs} = config;
const guestJWTOptions = {
	expiresIn: "24 hour",
	issuer: tokenArgs.issuer,
	audience: AUTHORITY_TYPE_GUEST,
	subject: "vaggle-guest-accessToken",
};

const guestJWTCookie = new JWTCookie(
	CookieKeys.GUEST_APP, tokenArgs.secret, guestJWTOptions);


export default guestJWTCookie;
