import express from "express";
import config from "../config";
import CookieKeys from "../CookieKeys.js";
import hostAuth from "../middleware/hostAuth.js";

const {routePage} = config;
const router = express.Router();

const logoutHandler = (req, res) => {
	res.clearCookie(CookieKeys.HOST_APP).redirect(routePage.main);
};

const rootHandler = (req, res) => {
	res.redirect(routePage.main);
};

router.get("/logout", logoutHandler);
router.get("/", hostAuth, rootHandler);

module.exports = router;
