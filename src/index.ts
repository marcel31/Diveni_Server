import './loadEnvironment.js';
import express, { type Express } from 'express';
import apiRouter from './api/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { socketRouter } from './api/routers/socketRouter.js';
import cors from 'cors';
import path from 'path';

const app: Express = express();
const port = process.env.HOST_PORT ?? '3001';
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {},
	cors: {
		origin: '*',
	}
});

app.use(express.static(path.join(process.cwd(), 'src/public')));
const corsOptions: cors.CorsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado');
	socketRouter(socket, io);
});
app.use(express.json());
app.use('/api/v1', apiRouter);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;