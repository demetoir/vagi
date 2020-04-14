const domain = process.env.REACT_APP_DEV_DOMAIN;

const config = {
	url: `http://${domain}:3001/guest`,
	websocketHost: `http://${domain}`,
	websocketPort: 4001,
	apolloURI: `http://${domain}:8000/graphql`,
	inValidHostRedirectURL: `http://${domain}:5000`,
};

export default config;
