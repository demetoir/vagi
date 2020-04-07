import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config";
import authRouter from "./routes/authRouter.js";
import guestRouter from "./routes/guestRouter.js";
import hostRouter from "./routes/hostRouter.js";
import customPassport from "./authentication/CustomPassport.js";

dotenv.config();

const {publicPath, routePage} = config;
const app = express();

app.use("/host-app", express.static(`${publicPath}/host-app`));
app.use("/guest-app", express.static(`${publicPath}/guest-app`));
app.use("/main-app", express.static(`${publicPath}/main-app`));

app.use(customPassport());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/guest", guestRouter);
app.use("/host", hostRouter);

app.get("/", (req, res) => {
	res.redirect(routePage.main);
});

export default app;
