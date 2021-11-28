import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'express-jwt';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

// Internals
import './data/db/mongoose.js'; // db-Connection
import apiRoutes from './data/API/apiRoutes.js';
import config from './config.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: 'http://localhost:3000'
});

io.on("connection", socket => console.log('connected -', socket.id));

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(jwt({
    secret: config.jwt.secret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: req => req?.cookies?.auth
}));

apiRoutes(app, io);

httpServer.listen(5000, () => console.log('Server is up on PORT: ', 5000));