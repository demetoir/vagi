const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	authLoginURL: `http://${domain}/express/auth/google/login`,
	guestSignUpURL: `http://${domain}/guest`,
	guestAppURL: `http://${domain}/guest-app`,
	hostSignUpURL: `http://${domain}/host`,
	hostAppURL: `http://${domain}/host-app`,
};

export default config;
