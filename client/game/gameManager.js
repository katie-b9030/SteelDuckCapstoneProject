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

let bubbleSpins;
let bubblePowerup;
let bubblePressed;

let dustSpins;
let dustPowerup;
let dustPressed;

function init() {
  GAME.getNextState();
  GAME.startGame();
}

function update() {
  bubbleSpins = ARDUINO_CONTROLLER.getBubbleSpins();
  bubblePowerup = ARDUINO_CONTROLLER.getBubblePowerup();
  bubblePressed = ARDUINO_CONTROLLER.getBubblePressed();
  dustSpins = ARDUINO_CONTROLLER.getDustSpins();
  dustPowerup = ARDUINO_CONTROLLER.getDustSpins();
  dustPressed = ARDUINO_CONTROLLER.getDustPressed();
  window.GAME.update();
}

window.onload = function () {
  init();
  mainGameLoop();
};

export function mainGameLoop() {
  if (window.GAME.state === Game.STATES.ONGOING) {
    update();

    window.BUBBLE_POWERUP = bubblePowerup;
    BUBBLE_TEAM.troopCreationProgress(
      bubbleSpins,
      GAME.spinThreshold,
      bubblePressed,
      bubblePowerup
    );

    window.DUST_POWERUP = dustPowerup;
    DUST_TEAM.troopCreationProgress(
      dustSpins,
      GAME.spinThreshold,
      dustPressed,
      dustPowerup
    );

    // if (GAME.timeRemaining <= 0) {
    //   GAME.getNextState();
    // }

    requestAnimationFrame(mainGameLoop);
  }
}

window.mousePressed = function () {
  console.log("Mouse Pressed");
  if (mouseY >= windowHeight - 225 && mouseY <= windowHeight - 25) {
    if (mouseX <= 100) {
      window.GAME.teams[0].spawnTroop(ARDUINO_CONTROLLER.getBubblePowerup());
    } else if (mouseX >= windowWidth - 100) {
      window.GAME.teams[1].spawnTroop(ARDUINO_CONTROLLER.getDustPowerup());
    }
  }
  console.log(
    "Bubbles: ",
    window.GAME.teams[0].troops,
    "\nBunnies: ",
    window.GAME.teams[1].troops
  );
};
