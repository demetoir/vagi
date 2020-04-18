import express from "express";
import CookieKeys from "../CookieKeys.js";
import hostAuth from "../middleware/hostAuth.js";
import JWTCookieParser from "../middleware/JWTCookieParser.js";
import HostController from "../controller/HostController.js";
import logger from "../logger.js";

const hostController = new HostController(logger);
const cookieKey = CookieKeys.HOST_APP;
const hostRouter = express.Router();

hostRouter.use(JWTCookieParser(cookieKey, logger));
hostRouter.get("/host/logout", hostController.logout());
hostRouter.get("/host/", hostAuth(), hostController.redirectToHostApp());

module.exports = hostRouter;
