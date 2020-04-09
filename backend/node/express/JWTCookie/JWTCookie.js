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

	verify(req) {
		if (!("jwtCookies" in req)) {
			throw new JWTCookieError("jwtCookies not found in request object");
		}

		const JWTCookies = req.jwtCookies;

		if (!(this.cookieKey in JWTCookies)) {
			throw new JWTCookieError(
				`jwt of cookie key '${this.cookieKey}' not found`,
			);
		}

		const token = JWTCookies[this.cookieKey];

		return jwt.verify(token, this.secret);
	}

	sign(payload) {
		return jwt.sign(payload, this.secret, this.options);
	}
}
