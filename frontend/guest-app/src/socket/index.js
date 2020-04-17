import io from "socket.io-client";
import React, {createContext} from "react";
import Cookie from "js-cookie";

function addBoilerplateSocketListener({socket, URL, room}) {
	socket.on("connect", async () => {
		// eslint-disable-next-line no-console
		console.debug(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
	});

	socket.on("joinRoom", () => {
		// eslint-disable-next-line no-console
		console.debug(`join room success at ${room}`);
	});

	socket.on("leaveRoom", () => {
		// eslint-disable-next-line no-console
		console.debug(`leave room success at ${room}`);
	});

	socket.on("disconnect", reason => {
		// eslint-disable-next-line no-console
		console.debug(`io client disconnected by ${reason}`);
	});

	socket.on("reconnect", attemptNumber => {
		// eslint-disable-next-line no-console
		console.debug(`io reconnect attempt ${attemptNumber}`);
	});

	socket.on("error", error => {
		// eslint-disable-next-line no-console
		console.debug(`io error raise ${error}`);
	});
}

function combineURL(host, nameSpace) {
	return nameSpace ? `${host}/${nameSpace}` : `${host}`;
}

export function createSocketIOClient({host, namespace, room}) {
	const cookieName = "vaagle-guest";
	const token = Cookie.get(cookieName);

	const URL = combineURL(host, namespace);

	const options = {
		credentials: false,
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${token}`,
				},
			},
		},
	};

	const socket = io(URL, options);

	if (process.env.NODE_ENV === "development") {
		addBoilerplateSocketListener({socket, URL, room});
	}

	return socket;
}

export let socketClient = null;

export let useSocket = null;

export function SocketClientProvider(props) {
	const {client, children} = props;

	socketClient = client;
	useSocket = (eventName = "EMIT", handler = () => {}) => {
		socketClient.off(eventName);
		socketClient.on(eventName, handler);
	};
	const context = createContext([]);
	const emit = socketClient.emit;

	return (
		<context.Provider value={{socketClient, emit}}>
			${children}
		</context.Provider>
	);
}
