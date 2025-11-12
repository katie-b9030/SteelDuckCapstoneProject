const { subscribe } = require("./serialHandler.js");
import { ArduinoController } from "../controllers/ArduinoController.js";
// import { KeyboardController } from "../controllers/KeyboardController.js";
import { Game } from "./classes/game.js";
import { Troop } from "./classes/troop.js";

const ARDUINO_CONTROLLER = new ArduinoController();
// const KEYBOARD_CONTROLLER = new KeyboardController();

window.GAME = new Game();
window.BUBBLE_POWERUP = "shield";
window.DUST_POWERUP = "shield";

const BUBBLE_TEAM = GAME.teams[0];
const DUST_TEAM = GAME.teams[1];

let bubbleState;
let bubbleSpins;
let bubblePowerup;
let bubblePressed;

let dustState;
let dustSpins;
let dustPowerup;
let dustPressed;

function init() {
  GAME.getNextState();
}

function update() {
  bubbleState = ARDUINO_CONTROLLER.getBubbleState();
  bubbleSpins = ARDUINO_CONTROLLER.getBubbleSpins();
  bubblePowerup = ARDUINO_CONTROLLER.getBubblePowerup();
  bubblePressed = ARDUINO_CONTROLLER.getBubblePressed();
  dustState = ARDUINO_CONTROLLER.getDustState();
  dustSpins = ARDUINO_CONTROLLER.getDustSpins();
  dustPowerup = ARDUINO_CONTROLLER.getDustSpins();
  dustPressed = ARDUINO_CONTROLLER.getDustPressed();
  window.GAME.update();
}

window.onload = function () {
  init();
  mainGameLoop();
};

function mainGameLoop() {
  if (window.GAME.state === GAME.STATES.ONGOING) {
    update();

    window.BUBBLE_POWERUP = bubblePowerup;
    troopCreationProgress(
      bubbleSpins,
      GAME.spinThreshold,
      bubblePressed,
      bubblePowerup
    );

    window.DUST_POWERUP = dustPowerup;
    troopCreationProgress(
      dustSpins,
      GAME.spinThreshold,
      dustPressed,
      dustPowerup
    );

    if (GAME.timeRemaining <= 0) {
      GAME.getNextState();
    }
  }

  requestAnimationFrame(mainGameLoop);
}
