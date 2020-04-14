const domain = process.env.REACT_APP_DEV_DOMAIN;

const socketServerPort = 4001;

const config = {
	socketIOHost: `http://${domain}`,
	socketIOPort: socketServerPort,
	apolloURI: `http://${domain}:8000/graphql`,
	logoutRedirectURL: `http://${domain}:3001/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}:5000`,
};

export default config;
