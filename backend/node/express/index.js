import dotenv from "dotenv";
import config from "./config";
import logger from "./logger.js";
import App from "./app.js";

dotenv.config();

const {port, publicPath} = config;
const app = App(config);

app.listen(port, () => {
	logger.info(
		`start express server at ${port} with ${process.env.NODE_ENV} mode at public path = ${publicPath}`,
	);
});
