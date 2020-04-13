import hostJWTCookie from "../JWTCookie/hostJWTCookie.js";
import JWTCookieOptions from "../JWTCookie/JWTCookieOptions.js";
import CookieKeys from "../CookieKeys.js";
import config from "../config";

const {routePage} = config;

export default class AuthController {
	constructor(logger = console) {
		this.logger = logger;
	}

	googleAuthCallback() {
		return (req, res) => {
			const {user} = req;

			if (!user) {
				this.logger.error(`req expect property 'user', but not exist`);
				return res.redirect(routePage.main);
			}

			if (!user.oauthId) {
				this.logger.error(`user expect property 'oauthId', but not exist`);
				return res.redirect(routePage.main);
			}

			const payload = {oauthId: user.oauthId};
			const accessToken = hostJWTCookie.sign(payload);
			const options = JWTCookieOptions.build();

			this.logger.debug(`google auth sign up ${user.oauthId}`);

			res.cookie(CookieKeys.HOST_APP, accessToken, options);
			return res.redirect(routePage.host);
		};
	}
}
