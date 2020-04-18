import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider} from "@apollo/react-hooks";
import axios from "axios";
import "./index.css";
import App from "./App/App.js";
import * as serviceWorker from "./libs/serviceWorker.js";
import createApolloClient from "./graphql/createApolloClient.js";
import config from "./config";
import {createSocketIOClient, SocketClientProvider} from "./socket";

(async () => {
	let token;

	try {
		const res = await axios({
			method: "post",
			url: "/api/guest/token",
		});

		console.debug(res);
		token = res.data.token;
	} catch (e) {
		console.debug(e);
		console.debug(e.response.data);
		return;
	}

	// axios request token
	const apolloClient = createApolloClient(config.apolloURI, token);
	const socketClient = createSocketIOClient({
		host: config.socketIOHost,
		namespace: config.namespace,
		room: event.id,
		token,
	});

	ReactDOM.render(
		<ApolloProvider client={apolloClient}>
			<SocketClientProvider client={socketClient}>
				<App />
			</SocketClientProvider>
		</ApolloProvider>,
		document.getElementById("root"),
	);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	serviceWorker.unregister();
})();
