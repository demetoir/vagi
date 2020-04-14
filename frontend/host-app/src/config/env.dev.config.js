const domain = process.env.REACT_APP_DEV_DOMAIN;
const expressPort = process.env.REACT_APP_DEV_DOMAIN_EXPRESS_PORT;
const graphqlPort = process.env.REACT_APP_DEV_DOMAIN_GRAPHQL_PORT;
const graphqlPath = process.env.REACT_APP_DEV_GRAPHQL_PATH;
const socketPort = process.env.REACT_APP_DEV_SOCKET_PORT;

const config = {
	socketIOHost: `http://${domain}`,
	socketIOPort: socketPort,
	apolloURI: `http://${domain}:${graphqlPort}/${graphqlPath}`,
	logoutRedirectURL: `http://${domain}:${expressPort}/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}:5000`,
};

export default config;
