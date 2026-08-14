// configuring the environment variables
import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app)
const io = connectToSocket(server)

app.set("port", process.env.PORT || 8000)

app.use(cors())
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true }))

app.use("/api/v1/users", userRoutes)

const port = process.env.PORT || 8000

const start = async () => {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI)
    server.listen(port, (req, res) => {
        console.log(`Server is listening on port ${port}`)
    })
}

start()
