import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js";
import guestRouter from "./routes/guestRouter.js";
import hostRouter from "./routes/hostRouter.js";
import staticRouter from "./routes/staticRouter.js";
import apiRouter from "./routes/apiRouter.js";
import customPassport from "./authentication/CustomPassport.js";

function App(config) {
	const app = express();
	const {routePage} = config;

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(customPassport(config));
	app.use(morgan("dev"));
	app.use(cookieParser());

	app.use("/", authRouter);
	app.use("/", guestRouter);
	app.use("/", hostRouter);
	app.use("/", apiRouter);
	app.use("/", staticRouter);

	app.get("/", (req, res) => {
		res.redirect(routePage.main);
	});

	return app;
}

export default App;
