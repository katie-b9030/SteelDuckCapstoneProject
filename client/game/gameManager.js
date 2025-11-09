//const { subscribe } = require("./serialHandler.js");
//import { ArduinoController } from "../controllers/ArduinoController.js";
import { KeyboardController } from "../controllers/KeyboardController.js";
import { Game } from "./classes/game.js";
import { Troop } from "./classes/troop.js";

//const ARDUINO_CONTROLLER = new ArduinoController();
const KEYBOARD_CONTROLLER = new KeyboardController();

window.GAME = new Game();

function init() {}

// function update() {}

window.onload = function () {
  init();
  mainGameLoop();
};

window.mousePressed = function () {
  if (mouseY >= 500 && mouseY <= 700) {
    if (mouseX <= 100) {
      window.GAME.teams[0].spawnTroop(Troop.POWERUP.SHIELD);
    } else if (mouseX >= windowWidth - 100) {
      window.GAME.teams[1].spawnTroop(Troop.POWERUP.SHIELD);
    }
  }
  console.log(
    "Bubbles: ",
    window.GAME.teams[0].troops,
    "\nBunnies: ",
    window.GAME.teams[1].troops
  );
};

function mainGameLoop() {
  if (window.GAME.state === GAME.STATES.ONGOING) {
    window.GAME.update();
  }

  requestAnimationFrame(mainGameLoop);
}
