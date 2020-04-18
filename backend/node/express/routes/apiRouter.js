import express from "express";
import logger from "../logger.js";
import ApiController from "../controller/ApiController.js";

const apiRouter = express.Router();
const apiController = new ApiController(logger);

apiRouter.get("/api/event", apiController.getEvent());

module.exports = apiRouter;
