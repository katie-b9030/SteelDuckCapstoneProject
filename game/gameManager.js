const { subscribe } = require("./serialHandler");

var timer = 0;

var bubbleScore = 0;
var dustScore = 0;

var Troops = [];

const States = {
  MENU: "menu",
  ONGOING: "ongoing",
  GAMEOVER: "gameover",
};

var gameState = MENU;

function init() {
  timer = 0;

  bubbleScore = 0;
  dustScore = 0;

  Troops = [];

  gameState = ONGOING; // set to ONGOING for demo purposes, will probably set to menu for regular gameplay
}

function update() {}

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
  if (gameState === States.ONGOING) {
    update();
  }

  requestAnimationFrame(mainGameLoop);
}
