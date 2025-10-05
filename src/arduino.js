const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const barrelPort = new SerialPort({ path: "COM5", baudRate: 9600 });
const cannonPort = new SerialPort({ path: "COM4", baudRate: 9600 });
const barrelParser = barrelPort.pipe(new ReadlineParser({ delimiter: "\n" }));
const cannonParser = cannonPort.pipe(new ReadlineParser({ delimiter: "\n" }));

let barrelDirection;
let barrelPowerup;
let barrelPressed;

let cannonLoadCount;
let cannonLoadPress;
let cannonDirection;
let cannonLaunched;

barrelPort.on("open", () => console.log("Barrel port open"));
cannonPort.on("open", () => console.log("Cannon port open"));

barrelParser.on("data", (data) => {
  barrelData = data.split(" | ");
  barrelDirection = barrelData[0];
  barrelPowerup = barrelData[1];
  barrelPressed = barrelData[2];
  console.log("Barrel output:", data);
});

cannonParser.on("data", (data) => {
  cannonData = data.split(" | ");
  cannonLoadCount = cannonData[0];
  cannonLoadPress = cannonData[1];
  cannonDirection = cannonData[2];
  cannonLaunched = cannonData[3];
  console.log("Cannon output:", data);
});

barrelPort.on("error", (err) =>
  console.error("Barrel port error:", err.message)
);
cannonPort.on("error", (err) =>
  console.error("Cannon port error:", err.message)
);

export {
  barrelDirection,
  barrelPowerup,
  barrelPressed,
  cannonLoadCount,
  cannonLoadPress,
  cannonDirection,
  cannonLaunched,
};
