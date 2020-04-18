import io from "socket.io-client";
import Cookie from "js-cookie";

function createSocket(URL, token) {


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

	socket.on("connect", () => {
		console.debug(
			`socket.io client connect to ${URL} as ${process.env.NODE_ENV} mode`,
		);
	});

	return socket;
}


export function initSocketIoClientWrapper(
	host,
	nameSpace = undefined,
	token
) {
	const url = nameSpace ? `${host}/${nameSpace}` : `${host}`;



	socketClient = createSocket(url, token);

	emitSocketEvent = (eventName, func) => () => {
		socketClient.emit(eventName, func());
	};

	useSocket = (eventName = "EMIT", handler = () => {
	}) => {
		socketClient.off(eventName);
		socketClient.on(eventName, handler);
	};
}

export let socketClient = () => {
};
export let emitSocketEvent = () => {
};
export let useSocket = () => {
};

