const domain = process.env.REACT_APP_PROD_DOMAIN;
const socketPort = process.env.REACT_APP_PROD_SOCKET_PORT;
const graphqlPort = process.env.REACT_APP_PROD_GRAPHQL_PORT;
const graphqlPath = process.env.REACT_APP_PROD_GRAPHQL_ENDPOINT;

const config = {
	socketIOHost: `http://${domain}`,
	socketIOPort: socketPort,
	apolloURI: `http://${domain}:${graphqlPort}${graphqlPath}`,
	logoutRedirectURL: `http://${domain}/guest/logout`,
	inValidGuestRedirectURL: `http://${domain}`,
};

export default config;
