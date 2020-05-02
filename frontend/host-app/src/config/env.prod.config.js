const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	socketIOHost: `https://${domain}`,
	namespace: "socket/namespace/event",
	apolloURI: `https://${domain}/graphql`,
	logoutRedirectURL: `https://${domain}/guest/logout`,
	inValidGuestRedirectURL: `https://${domain}`,
	eventLinkURL: `https://${domain}/guest`,
};

export default config;
