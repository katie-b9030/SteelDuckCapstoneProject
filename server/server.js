const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const arduinoParser = require("./arduino");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const urlStruct = {
// //   '/': htmlHandler.getIndex,
// //   '/bundle.js': htmlHandler.getBundle,
// };

// const onRequest = (request, response) => {
//   const protocol = request.connection.encrypted ? 'https' : 'http';
//   const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
//   request.query = Object.fromEntries(parsedUrl.searchParams);

//   if (urlStruct[parsedUrl.pathname]) {
//     urlStruct[parsedUrl.pathname](request, response);
//   } else {
//     urlStruct.notFound(request, response);
//   }
// };

app.use(express.static("client"));

arduinoParser.subscribe("barrel", (data) => io.emit("barrelData", data));
arduinoParser.subscribe("cannon", (data) => io.emit("cannonData", data));

server.listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
