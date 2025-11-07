const EXPRESS = require("express");
const HTTP = require("http");
const { Server } = require("socket.io");
const ARDUINO_PARSER = require("./arduino");
const { startGameLoop } = require("../game/gameManager.js");

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);
const io = new Server(SERVER);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

APP.use(EXPRESS.static("client"));
APP.use("/media", EXPRESS.static("media"));
APP.use("/game", EXPRESS.static("game"));

ARDUINO_PARSER.subscribe("barrel", (data) => io.emit("barrelData", data));
ARDUINO_PARSER.subscribe("cannon", (data) => io.emit("cannonData", data));

startGameLoop(io);

SERVER.listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
