const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	authLoginURL: `http://${domain}/express/auth/google/login`,
	guestAppURL: `http://${domain}/express/guest`,
	hostAppURL: `http://${domain}/express/host`,
};

export default config;
