const { subscribe } = require("./serialHandler");
//import { ArduinoController } from "../controllers/ArduinoController.js";
import { KeyboardController } from "../controllers/KeyboardController.js";
import { Game } from "./classes/game.js";
import { Troop } from "./classes/troop.js";

//const ARDUINO_CONTROLLER = new ArduinoController();
const KEYBOARD_CONTROLLER = new KeyboardController();

const GAME = new Game();

var gameState = MENU;

function init() {}

// function update() {}

window.onload = function () {
  init();
  mainGameLoop();
};

window.mousePressed = function () {
  if (mouseY >= 500 && mouseY <= 700) {
    if (mouseX <= SPAWN_ZONE_WIDTH) {
      GAME.teams[0].spawnTroop(Troop.powerup.SHIELD);
    } else if (mouseX >= windowWidth - SPAWN_ZONE_WIDTH) {
      GAME.teams[1].spawnTroop(Troop.powerup.SHIELD);
    }
  }
};

function mainGameLoop() {
  if (gameState === STATES.ONGOING) {
    GAME.update();
  }

  requestAnimationFrame(mainGameLoop);
}
