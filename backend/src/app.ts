import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import routes from "./routes/";

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {});

app.use(cors());
app.use(express.json());
app.use(routes);

export { serverHttp, io };
