const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const BUBBLE_PORT = new SerialPort({ path: "COM6", baudRate: 9600 });
// const BUBBLE_PORT = new SerialPort({ path: "COM4", baudRate: 9600 });
// const DUST_PORT = new SerialPort({ path: "COM4", baudRate: 9600 });
const DUST_PORT = new SerialPort({ path: "COM3", baudRate: 9600 });
const BUBBLE_PARSER = BUBBLE_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));
const DUST_PARSER = DUST_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));

const SUBSCRIBERS = { barrel: [], cannon: [] };

function notify(type, data) {
  SUBSCRIBERS[type].forEach((callback) => callback(data));
}

function subscribe(type, callback) {
  SUBSCRIBERS[type].push(callback);
}

BUBBLE_PORT.on("open", () => console.log("Barrel port open"));
DUST_PORT.on("open", () => console.log("Cannon port open"));

BUBBLE_PARSER.on("data", (data) => {
  bubbleData = data.split(" | ").map((s) => s.trim());
  notify("bubble", {
    bubbleState: bubbleData[0],
    bubbleSpins: parseInt(bubbleData[1]),
    bubblePowerup: bubbleData[2],
    bubblePressed: bubbleData[3],
  });
  console.log("Bubble output:", data);
});

DUST_PARSER.on("data", (data) => {
  dustData = data.split(" | ").map((s) => s.trim());
  notify("dust", {
    dustState: dustData[0],
    dustSpins: parseInt(dustData[1]),
    dustPowerup: dustData[2],
    dustPressed: dustData[3],
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
