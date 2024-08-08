import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


import chatRouter from './gemini/gemini.controller.js';

app.use('/chat', chatRouter);

const server = http.createServer(app);

server.listen(process.env.PORT || '3000');
