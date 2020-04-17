const domain = process.env.REACT_APP_DEV_DOMAIN;

const config = {
	socketIOHost: `http://${domain}`,
	namespace: "socket/namespace/event",
	apolloURI: `http://${domain}/graphql`,
	logoutRedirectURL: `http://${domain}/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}`,
	eventLinkURL: `http://${domain}/guest`,
};

export default config;
