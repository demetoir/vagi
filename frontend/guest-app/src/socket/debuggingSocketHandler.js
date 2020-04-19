export default function addBoilerplateSocketListener({socket, URL, room}) {
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
