import dotenv from "dotenv";
import express from "express";
import http from "http";
import io from "socket.io";
import configLoader from "./config/configLoader.js";
import logger from "./logger.js";
import authenticate from "./middleware/authenticate";
import socketHandlers from "./socketHandler";
import {
	SOCKET_IO_EVENT_CONNECTION,
	SOCKET_IO_EVENT_DISCONNECT,
	SOCKET_IO_EVENT_DISCONNECTING,
	SOCKET_IO_EVENT_ERROR,
} from "../constants/socket.io-Events.js";
import RoomSocket from "./RoomSocket.js";

dotenv.config();

const {port, namespace} = configLoader();
const app = express();

const httpServer = http.createServer(app);

// noinspection JSUnusedGlobalSymbols
const socketServer = io(httpServer, {
	// for Preflight request of socket.io polling xhr request
	// it should response http status code
	handlePreflightRequest: (req, res) => {
		// add origin check
		const headers = {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Origin": req.headers.origin,
			"Access-Control-Allow-Credentials": true,
		};

		res.writeHead(200, headers);
		res.end();
	},
});

socketServer.use(authenticate);

const namedServer = socketServer.of(namespace);

namedServer.roomSockets = {};
namedServer.on(SOCKET_IO_EVENT_CONNECTION, async socket => {
	const id = socket.id;

	logger.info(`id ${id} connected at /${namespace}`);

	const roomSocket = new RoomSocket({
		socket,
		server: namedServer,
		handlerEventPair: socketHandlers,
	});

	namedServer.roomSockets[id] = roomSocket;


	socket.on(SOCKET_IO_EVENT_ERROR, error =>
		logger.info(`error occur at socket id ${id} disconnected ${error}`),
	);
	socket.on(SOCKET_IO_EVENT_DISCONNECTING, reason => {
		logger.info(`disconnecting at id ${id}, reason:${reason}`);
	});
	socket.on(SOCKET_IO_EVENT_DISCONNECT, reason => {
		logger.info(`socket id ${id} disconnected reason:${reason}`);
	});
});

httpServer.listen(port, () => {
	logger.info(
		`start socket.io server at ${port} with ${process.env.NODE_ENV} mode`,
	);
});

export default app;
