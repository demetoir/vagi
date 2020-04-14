const domain = process.env.REACT_APP_PROD_DOMAIN;

const config = {
	url: `http://${domain}/guest`,
	websocketHost: `http://${domain}`,
	websocketPort: 4000,
	apolloURI: `http://${domain}:8000/graphql`,
	inValidGuestRedirectURL: `http://${domain}`,
};

export default config;
