const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const BARREL_PORT = new SerialPort({ path: "COM6", baudRate: 9600 });
// const BARREL_PORT = new SerialPort({ path: "COM4", baudRate: 9600 });
// const CANNON_PORT = new SerialPort({ path: "COM4", baudRate: 9600 });
const CANNON_PORT = new SerialPort({ path: "COM3", baudRate: 9600 });
const BARREL_PARSER = BARREL_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));
const CANNON_PARSER = CANNON_PORT.pipe(new ReadlineParser({ delimiter: "\n" }));

const SUBSCRIBERS = { barrel: [], cannon: [] };

function notify(type, data) {
  SUBSCRIBERS[type].forEach((callback) => callback(data));
}

function subscribe(type, callback) {
  SUBSCRIBERS[type].push(callback);
}

BARREL_PORT.on("open", () => console.log("Barrel port open"));
CANNON_PORT.on("open", () => console.log("Cannon port open"));

BARREL_PARSER.on("data", (data) => {
  barrelData = data.split(" | ").map((s) => s.trim());
  notify("barrel", {
    barrelSpins: parseInt(barrelData[0]),
    //barrelPressed: barrelData[1],
    barrelPowerup: barrelData[1],
    barrelPowerupPressed: barrelData[2],
  });
  console.log("Barrel output:", data);
});

CANNON_PARSER.on("data", (data) => {
  cannonData = data.split(" | ").map((s) => s.trim());
  notify("cannon", {
    cannonLoadCount: cannonData[0],
    cannonLoadPress: cannonData[1],
    cannonDirection: cannonData[2],
    cannonLaunched: cannonData[3],
  });
  console.log("Cannon output:", data);
});

BARREL_PORT.on("error", (err) =>
  console.error("Barrel port error:", err.message)
);
CANNON_PORT.on("error", (err) =>
  console.error("Cannon port error:", err.message)
);

module.exports = {
  subscribe,
};
