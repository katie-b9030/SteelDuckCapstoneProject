const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// const BUBBLE_PORT = new SerialPort({ path: "COM6", baudRate: 9600 });
const BUBBLE_PORT = new SerialPort({ path: "COM3", baudRate: 9600 });
const DUST_PORT = new SerialPort({ path: "COM4", baudRate: 9600 });
// const DUST_PORT = new SerialPort({ path: "COM5", baudRate: 9600 });
const BUBBLE_PARSER = BUBBLE_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));
const DUST_PARSER = DUST_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));

const SUBSCRIBERS = { bubble: [], dust: [] };

function notify(type, data) {
  SUBSCRIBERS[type].forEach((callback) => callback(data));
}

function subscribe(type, callback) {
  SUBSCRIBERS[type].push(callback);
}

BUBBLE_PORT.on("open", () => console.log("Bubble port open"));
DUST_PORT.on("open", () => console.log("Dust port open"));

BUBBLE_PARSER.on("data", (data) => {
  bubbleData = data.split(" | ").map((s) => s.trim());
  notify("bubble", {
    bubbleSpins: parseInt(bubbleData[0]),
    bubblePowerup: bubbleData[1],
    bubblePressed: bubbleData[2],
  });
  console.log("Bubble output:", data);
});

DUST_PARSER.on("data", (data) => {
  dustData = data.split(" | ").map((s) => s.trim());
  notify("dust", {
    dustSpins: parseInt(dustData[0]),
    dustPowerup: dustData[1],
    dustPressed: dustData[2],
  });
  console.log("Dust output:", data);
});

BUBBLE_PORT.on("error", (err) =>
  console.error("Bubble port error:", err.message)
);
DUST_PORT.on("error", (err) => console.error("Dust port error:", err.message));

module.exports = {
  subscribe,
};
