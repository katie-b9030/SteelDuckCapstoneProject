const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// const barrelPort = new SerialPort({ path: "COM5", baudRate: 9600 });
const barrelPort = new SerialPort({ path: "COM3", baudRate: 9600 });
const cannonPort = new SerialPort({ path: "COM4", baudRate: 9600 });
const barrelParser = barrelPort.pipe(new ReadlineParser({ delimiter: "\n" }));
const cannonParser = cannonPort.pipe(new ReadlineParser({ delimiter: "\n" }));

const subscribers = { barrel: [], cannon: [] };

function notify(type, data) {
  subscribers[type].forEach((callback) => callback(data));
}

function subscribe(type, callback) {
  subscribers[type].push(callback);
}

barrelPort.on("open", () => console.log("Barrel port open"));
cannonPort.on("open", () => console.log("Cannon port open"));

barrelParser.on("data", (data) => {
  barrelData = data.split(" | ").map((s) => s.trim());
  notify("barrel", {
    barrelDirection: barrelData[0],
    barrelPressed: barrelData[1],
    barrelPowerup: barrelData[2],
    barrelPowerupPressed: barrelData[3],
  });
  console.log("Barrel output:", data);
});

cannonParser.on("data", (data) => {
  cannonData = data.split(" | ").map((s) => s.trim());
  notify("cannon", {
    cannonLoadCount: cannonData[0],
    cannonLoadPress: cannonData[1],
    cannonDirection: cannonData[2],
    cannonLaunched: cannonData[3],
  });
  console.log("Cannon output:", data);
});

barrelPort.on("error", (err) =>
  console.error("Barrel port error:", err.message)
);
cannonPort.on("error", (err) =>
  console.error("Cannon port error:", err.message)
);

module.exports = {
  subscribe,
};
