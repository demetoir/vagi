const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	authLoginURL: `http://${domain}/auth/google/login`,
	guestAppURL: `http://${domain}/guest`,
	hostAppURL: `http://${domain}/host`,
};

export default config;
