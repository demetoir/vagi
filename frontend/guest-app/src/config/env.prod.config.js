const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	socketIOHost: `http://${domain}`,
	namespace: "socket/namespace/event",
	apolloURI: `http://${domain}/graphql`,
	logoutRedirectURL: `http://${domain}/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}`,
};

export default config;
