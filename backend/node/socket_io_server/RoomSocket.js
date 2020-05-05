import {
	SOCKET_IO_EVENT_JOIN_ROOM,
	SOCKET_IO_EVENT_LEAVE_ROOM,
} from "../constants/socket.io-Events.js";
import logger from "./logger.js";

// todo test
class RoomSocket {
	constructor({socket, server, handlerEventPair}) {
		this.id = socket.id;
		this.socket = socket;
		this.server = server;
		this.handlerPair = handlerEventPair;
		this.registeredHandler = [];
		this.room = null;

		this.addRoomHandler();
	}

	addRoomHandler() {
		const onJoinRoom = async req => {
			const {room} = req;

			if (this.room) {
				logger.error(`id: ${this.id} already join in room`);
				return;
			}

			try {
				this.joinRoom(room);
			} catch (e) {
				logger.error(`error raised while join room ${e}`);
			}
		};

		const onLeaveRoom = async () => {
			try {
				this.leaveRoom();
			} catch (e) {
				logger.error(`error raised while leave room ${e}`);
			}
		};

		this.socket.on(SOCKET_IO_EVENT_JOIN_ROOM, onJoinRoom);
		this.socket.on(SOCKET_IO_EVENT_LEAVE_ROOM, onLeaveRoom);
	}

	joinRoom(room) {
		this.room = room;

		this.socket.join(this.room);

		this.registeredHandler = this.handlerPair.map(({eventName, handler}) =>
			this.addListener(eventName, handler),
		);

		this.socket.emit(SOCKET_IO_EVENT_JOIN_ROOM);
	}

	leaveRoom() {
		this.socket.leave(this.room);

		this.registeredHandler.map(({eventName, handler}) =>
			this.socket.removeListener(eventName, handler),
		);

		this.socket.emit(SOCKET_IO_EVENT_LEAVE_ROOM);

		this.room = null;
		this.registeredHandler = [];
	}

	addListener(event, handler) {
		const roomEmit = res => {
			this.server.to(this.room).emit(event, res);
		};

		const wrappedSocketHandler = data => {
			handler(data, roomEmit, {
				socket: this.socket,
				server: this.server,
				room: this.room,
			});
		};

		this.socket.on(event, wrappedSocketHandler);

		return {
			eventName: event,
			handler: wrappedSocketHandler,
		};
	}
}

export default RoomSocket;
