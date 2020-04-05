import jwt from "jsonwebtoken";
import CookieKeys from "../CookieKeys.js";
import config from "../config";

const {tokenArgs} = config;


export class JWTCookieError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "JWTCookieError";
	}
}


export class JWTCookie {
	constructor(cookieKey, secret) {
		this.cookieKey = cookieKey;
		this.secret = secret;
	}

	verify(jwts) {
		if (!(this.cookieKey in jwts)) {
			throw new JWTCookieError(`jwt of cookie key '${this.cookieKey}' not found`);
		}

		const payload = jwts[this.cookieKey];

		return jwt.verify(
			payload,
			this.secret,
		);
	}

	sign(payload) {
		return jwt.sign(
			payload,
			this.secret,
		);
	}
}


export const guestJWTCookie = new JWTCookie(CookieKeys.GUEST_APP, tokenArgs.secret);

export const hostJWTCookie = new JWTCookie(CookieKeys.HOST_APP, tokenArgs.secret);
