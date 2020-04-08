import jwt from "jsonwebtoken";

export class JWTCookieError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "JWTCookieError";
	}
}

export class JWTCookie {
	constructor(cookieKey, secret, options) {
		this.cookieKey = cookieKey;
		this.secret = secret;
		this.options = options;
	}

	verify(jwts) {
		if (!(this.cookieKey in jwts)) {
			throw new JWTCookieError(
				`jwt of cookie key '${this.cookieKey}' not found`,
			);
		}

		const token = jwts[this.cookieKey];

		return jwt.verify(token, this.secret);
	}

	sign(payload) {
		return jwt.sign(payload, this.secret, this.options);
	}
}
