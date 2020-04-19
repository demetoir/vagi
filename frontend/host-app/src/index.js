import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import {ApolloProvider} from "@apollo/react-hooks";
import "./index.css";
import * as serviceWorker from "./libs/serviceWorker.js";
import {initSocketIoClientWrapper} from "./libs/socket.io-Client-wrapper.js";
import config from "./config";
import createApolloClient from "./graphql/createApolloClient.js";
import AppLoadingWrapper from "./App/AppLoadingWrapper.js";

(async () => {
	let token;

	try {
		const res = await axios({
			method: "post",
			url: "/api/host/token",
			headers: {"X-Request-from": "host"},
		});

		console.debug(res);

		token = res.data.token;
	} catch (e) {
		console.debug(e);

		console.debug(e.response.data);
		// todo add error page
		return;
	}

	initSocketIoClientWrapper(config.socketIOHost, config.namespace, token);

	const apolloClient = createApolloClient(config.apolloURI, token);

	ReactDOM.render(
		<ApolloProvider client={apolloClient}>
			<AppLoadingWrapper/>
		</ApolloProvider>,
		document.getElementById("root"),
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();
