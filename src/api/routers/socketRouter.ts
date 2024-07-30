import { type Server, type Socket } from 'socket.io';
import { gameController } from '../controllers/gameController.js';

export function socketRouter(socket: Socket, io: Server) {
    gameController(socket, io);
}