import express from "express";
import guestAuth from "../middleware/guestAuth.js";
import logger from "../logger.js";
import GuestController from "../controller/GuestController.js";
import CookieKeys from "../CookieKeys.js";
import JWTParser from "../middleware/JWTCookieParser.js";

const guestRouter = express.Router();
const guestController = new GuestController(logger);
const cookieKey = CookieKeys.GUEST_APP;

guestRouter.use(JWTParser(cookieKey, logger));
guestRouter.get("/", guestAuth(), guestController.logIn);
guestRouter.get("/logout", guestAuth(), guestController.logOut);

// todo guest 가 여러군데 접속 할수 있을때 가입하는 방식에 문제 있다
// 클라에서 쿠키 있는경우 현재 인코딩 된 이벤트와 동일한지 확인해야함
// 기존 말고 다른쿠키가 있는경우는 라던가
guestRouter.get("/:encodedEventCode", guestController.signUp);

module.exports = guestRouter;
