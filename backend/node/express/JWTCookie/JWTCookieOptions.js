const getTokenExpired = hour =>
	new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));

const COOKIE_EXPIRE_TIME = 2;

export default class JWTCookieOptions {
	static build() {
		return {
			expires: getTokenExpired(COOKIE_EXPIRE_TIME),
		};
	}
}
