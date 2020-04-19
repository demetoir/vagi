import express from "express";
import passport from "passport";
import logger from "../logger.js";
import AuthController from "../controller/AuthController.js";

const authRouter = express.Router();

authRouter.get(
	"/auth/google/login",
	passport.authenticate("google", {
		session: false,
		scope: ["email", "profile"],
		prompt: "select_account",
	}),
);

const authController = new AuthController(logger);

authRouter.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	authController.googleAuthCallback(),
);

export default authRouter;
