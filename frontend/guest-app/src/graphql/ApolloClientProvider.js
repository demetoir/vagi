import React from "react";
import {ApolloProvider} from "@apollo/react-hooks";
import createApolloClient from "./createApolloClient.js";
import config from "../config";

const cookieKey = "vaagle-guest";
const client = createApolloClient(config.apolloURI, cookieKey);

function ApolloClientProvider(props) {
	return (
		<ApolloProvider client={client}>
			{props.children}
		</ApolloProvider>
	);
}

export default ApolloClientProvider;
