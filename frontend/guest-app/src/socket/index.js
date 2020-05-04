import io from "socket.io-client";
import React, {createContext} from "react";
import _ from "lodash";
import debuggingHandler from "./debuggingSocketHandler.js";
import {
	SOCKET_IO_EVENT_CONNECT,
	SOCKET_IO_EVENT_JOIN_ROOM,
} from "../constants/socket.io-event.js";

export function createSocketIOClient({host, namespace, room, token}) {
	const URL = namespace ? `${host}/${namespace}` : `${host}`;

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
		debuggingHandler({socket, URL, room});
	}

	socket.on(SOCKET_IO_EVENT_CONNECT, () => {
		socket.emit(SOCKET_IO_EVENT_JOIN_ROOM, {room});
	});

	scrollSyncManager.startSync();

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

class ScrollSyncManger {
	constructor() {
		this.oldTarget = {};
		this.target = {};
		this.socketClient = socketClient;
		this.timeFraction = 100;
		this.interval = null;
	}

	add(key) {
		if (!(key in this.target)) {
			this.target[key] = key;
			console.debug(`add ${key}`);
		}
	}

	remove(key) {
		if (key in this.target) {
			delete this.target[key];
			console.debug(`remove ${key}`);
		}
	}

	startSync() {
		this.interval = setInterval(() => {
			if (_.isEqual(this.oldTarget, this.target)) {
				return;
			}

			this.oldTarget = _.cloneDeep(this.target);
			socketClient.emit("syncScroll", this.target);
			console.debug("emit syncScroll", this.target);
		}, this.timeFraction);
	}

	endSync() {
		clearInterval(this.interval);
	}
}

export const scrollSyncManager = new ScrollSyncManger();
