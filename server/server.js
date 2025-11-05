const express = require("express");
const http = require("http");
const { io } = require("socket.io");
const arduinoParser = require("./arduino");

const app = express();
const server = http.createServer(app);
const socket = new io(server);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use(express.static("client"));
app.use("/media", express.static("media"));

arduinoParser.subscribe("barrel", (data) => socket.emit("barrelData", data));
arduinoParser.subscribe("cannon", (data) => socket.emit("cannonData", data));

server.listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
