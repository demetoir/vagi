import express from "express";
import CookieKeys from "../CookieKeys.js";
import hostAuth from "../middleware/hostAuth.js";
import JWTParser from "../middleware/JWTCookieParser.js";
import HostController from "../controller/HostController.js";
import logger from "../logger.js";

const hostController = new HostController(logger);
const cookieKey = CookieKeys.HOST_APP;
const hostRouter = express.Router();

hostRouter.use(JWTParser(cookieKey, logger));
hostRouter.get("/logout", hostController.logout);
hostRouter.get("/", hostAuth(), hostController.redirectToHostApp);

module.exports = hostRouter;
