import React from "react";
import ReactDOM from "react-dom";
import {MockedProvider} from "@apollo/react-testing";
import App from "./App.js";
import {SocketClientProvider} from "../socket";

it("renders without crashing", () => {
	const div = document.createElement("div");

	ReactDOM.render(
		<MockedProvider client={[]}>
			<SocketClientProvider client={{}}>
				<App />
			</SocketClientProvider>
		</MockedProvider>,
		div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
