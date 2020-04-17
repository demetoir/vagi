import io from "socket.io-client";
import Cookie from "js-cookie";

function getSocket(URL) {
	const cookieName = "vaagle-host";
	const token = Cookie.get(cookieName);

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


function combineURL(host, nameSpace) {
	return nameSpace ? `${host}/${nameSpace}` : `${host}`;
}

export function initSocketIoClientWrapper(
	host,
	nameSpace = undefined,
) {
	const url = combineURL(host, nameSpace);

	socketClient = getSocket(url);

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

