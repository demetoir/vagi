import {AUTHORITY_TYPE_HOST} from "../../constants/authorityTypes.js";
import CookieKeys from "../CookieKeys.js";
import {JWTCookie} from "./JWTCookie.js";
import config from "../config";

const {tokenArgs} = config;
const HOST_JWT_SUBJECT = "vaggle-host-accessToken";
const hostJWTOptions = {
	expiresIn: "24 hour",
	issuer: tokenArgs.issuer,
	audience: AUTHORITY_TYPE_HOST,
	subject: HOST_JWT_SUBJECT,
};

const hostJWTCookie = new JWTCookie(
	CookieKeys.HOST_APP,
	tokenArgs.secret,
	hostJWTOptions,
);

export default hostJWTCookie;
