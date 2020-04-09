import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider} from "@apollo/react-hooks";
import "./index.css";
import * as serviceWorker from "./libs/serviceWorker.js";
import {initSocketIoClientWrapper} from "./libs/socket.io-Client-wrapper.js";
import config from "./config";
import createApolloClient from "./graphql/createApolloClient.js";
import AppLoadingWrapper from "./App/AppLoadingWrapper.js";

const NAME_SPACE = "event";

initSocketIoClientWrapper(
	config.websocketHost,
	config.websocketPort,
	NAME_SPACE,
);

const HOST_COOKIE_KEY = "vaagle-host";
const client = createApolloClient(config.apolloURI, HOST_COOKIE_KEY);

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppLoadingWrapper/>
	</ApolloProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
