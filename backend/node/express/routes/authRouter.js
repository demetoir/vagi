import express from "express";
import passport from "passport";
import generateAccessToken from "../authentication/token";
import config from "../config";
import CookieKeys from "../CookieKeys.js";
import {AUTHORITY_TYPE_HOST} from "../../constants/authorityTypes.js";
import JWTCooKieOptions from "../JWTCookie/JWTCooKieOptions.js";

const {routePage} = config;
const authRouter = express.Router();

authRouter.get(
	"/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	}),
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	(req, res) => {
		const {user} = req;
		const accessToken = generateAccessToken(user.oauthId, AUTHORITY_TYPE_HOST);
		const options = JWTCooKieOptions.build();

		res.cookie(CookieKeys.HOST_APP, accessToken, options);
		res.redirect(routePage.host);
	},
);

export default authRouter;
