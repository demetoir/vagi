import React from "react";
import ReactDOM from "react-dom";
import Cookie from "js-cookie";
import {ApolloProvider} from "@apollo/react-hooks";
import "./index.css";
import * as serviceWorker from "./libs/serviceWorker.js";
import {initSocketIoClientWrapper} from "./libs/socket.io-Client-wrapper.js";
import config from "./config";
import createApolloClient from "./graphql/createApolloClient.js";
import AppLoadingWrapper from "./App/AppLoadingWrapper.js";

(async () => {
	const cookieName = "vaagle-host";
	const token = Cookie.get(cookieName);

	initSocketIoClientWrapper(config.socketIOHost, config.namespace, token);

	const apolloClient = createApolloClient(config.apolloURI, token);

	ReactDOM.render(
		<ApolloProvider client={apolloClient}>
			<AppLoadingWrapper />
		</ApolloProvider>,
		document.getElementById("root"),
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();
