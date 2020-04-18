import express from "express";
import config from "../config";

const {publicPath, routePage} = config;
const staticRouter = express.Router();

if (process.env.NODE_ENV === "development") {
	staticRouter.use("/host-app", (req, res) => res.redirect(routePage.host));
	staticRouter.use("/guest-app", (req, res) => res.redirect(routePage.guest));
	staticRouter.use("/main-app", (req, res) => res.redirect(routePage.main));
} else {
	staticRouter.use("/host-app", express.static(`${publicPath}/host-app`));
	staticRouter.use("/guest-app", express.static(`${publicPath}/guest-app`));
	staticRouter.use("/main-app", express.static(`${publicPath}/main-app`));
}

module.exports = staticRouter;
