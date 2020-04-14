const domain = process.env.REACT_APP_DEV_DOMAIN;
const port = process.env.REACT_APP_DEV_EXPRESS_PORT;

const config = {
	authLoginURL: `http://${domain}:${port}/auth/google/login`,
	guestAppURL: `http://${domain}:${port}/guest`,
	hostAppURL: `http://${domain}:${port}/host`,
};

export default config;
