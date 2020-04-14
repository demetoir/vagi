const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	socketIOHost: `http://${domain}`,
	socketIOPort: 4000,
	apolloURI: `http://${domain}:8000/graphql`,
	logoutRedirectURL: `http://${domain}/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}`,
};

export default config;
