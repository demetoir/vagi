import express from "express";
import passport from "passport";
import config from "../config";
import CookieKeys from "../CookieKeys.js";
import JWTCookieOptions from "../JWTCookie/JWTCookieOptions.js";
import hostJWTCookie from "../JWTCookie/hostJWTCookie.js";

const {routePage} = config;
const authRouter = express.Router();

authRouter.get(
	"/google/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	}),
);

// todo test
const googleAuthCallbackController = (req, res) => {
	const {user} = req;

	const payload = {oauthId: user.oauthId};
	const accessToken = hostJWTCookie.sign(payload);
	const options = JWTCookieOptions.build();

	res.cookie(CookieKeys.HOST_APP, accessToken, options);
	res.redirect(routePage.host);
};

authRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	googleAuthCallbackController,
);

export default authRouter;
