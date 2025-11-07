const { subscribe } = require("./serialHandler");
import { ArduinoController } from "../controllers/ArduinoController.js";

const ARDUINO_CONTROLLER = new ArduinoController();

const GAME = new Game();

const STATES = {
  MENU: "menu",
  ONGOING: "ongoing",
  GAMEOVER: "gameover",
};

var gameState = MENU;

function init() {}

// function update() {}

window.onload = function () {
  init();
  mainGameLoop();
};

subscribe("barrel", (data) => {
  console.log("Barrel data:", data);

  // if(data.barrelSpun === "1") {            // this is just an example until the data in arduino.js is changed to accomodate the contact magnets
  //     console.log("Barrel spun!");
  // }
});

function mainGameLoop() {
  if (gameState === STATES.ONGOING) {
    GAME.update();
  }

  requestAnimationFrame(mainGameLoop);
}
