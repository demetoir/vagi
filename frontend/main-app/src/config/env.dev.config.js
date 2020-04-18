const domain = process.env.REACT_APP_DEV_DOMAIN;

const config = {
	authLoginURL: `http://${domain}/auth/google/login`,
	guestSignUpURL: `http://${domain}/guest`,
	guestAppURL: `http://localhost:5002`,
	guestEventCode: `http://${domain}/api/event`,
	hostSignUpURL: `http://${domain}/host`,
	hostAppURL: `http://localhost:5001`,
};

export default config;
