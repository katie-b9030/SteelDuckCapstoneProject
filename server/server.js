const EXPRESS = require("express");
const HTTP = require("http");
const { io } = require("socket.io");
const ARDUINO_PARSER = require("./arduino");

const APP = EXPRESS();
const SERVER = HTTP.createServer(APP);
const SOCKET = new io(SERVER);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

APP.use(EXPRESS.static("client"));
APP.use("/media", EXPRESS.static("media"));

ARDUINO_PARSER.subscribe("barrel", (data) => SOCKET.emit("barrelData", data));
ARDUINO_PARSER.subscribe("cannon", (data) => SOCKET.emit("cannonData", data));

SERVER.listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
