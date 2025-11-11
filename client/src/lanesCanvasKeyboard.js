"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";
import { Rive } from "@rive-app/canvas";

// global consts
const SPAWN_ZONE_WIDTH = 100;
const BUBBLE_TROOP_WIDTH = 500;
const DUST_TROOP_WIDTH = 400;
const TROOP_HEIGHT = 350;

const CONTROLLER = new KeyboardController();
const RIVE = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
});

const LANES = [
  { y: 50, h: 200 },
  { y: 350, h: 200 },
  { y: 650, h: 200 },
];

let barX = 10;
let barY = 10;
let bigBarW;
let barH = 20;
let barW = 1;

// images
let backgroundImage;
// bubble soldiers
let bubbleSoldierPlainGif;
let bubbleSoldierHelmetGif;
let bubbleSoldierChestplateGif;
let bubbleSoldierShieldGif;
// dust soldiers
let dustSoldierPlainGif;
let dustSoldierHelmetGif;
let dustSoldierCloakGif;
let dustSoldierShieldGif;

let powerup;

let bubbleTroops = [];
let dustTroops = [];

function squareMove() {
  // Square is the Barrel Rotary Encoder
  const DIR = CONTROLLER.getBarrelDirection();
  if (DIR === "Clockwise") barW += 1;
  else if (DIR === "Counter-Clockwise") barW -= 1;
}

function mouseInLanes() {
  return (
    //(mouseY >= 50 && mouseY <= 250) || // Lane 1
    mouseY >= 500 && mouseY <= 700 // Lane 2
    //(mouseY >= 650 && mouseY <= 850) // Lane 3
  );
}

function drawLanesAndSpawns() {
  noStroke();
  // Actual Lane
  fill("rgba(0, 0, 0, 0.5)");
  rect(0, 500, width, 200);
  // Actual Lane
  fill("rgba(0, 0, 0, 0.5)");
  rect(0, 500, width, 200);

  //Bubble spawn
  fill("rgba(35, 85, 221, 0.5)");
  rect(0, 500, SPAWN_ZONE_WIDTH, 200);
  //Bubble spawn
  fill("rgba(35, 85, 221, 0.5)");
  rect(0, 500, SPAWN_ZONE_WIDTH, 200);

  //Dust spawn
  fill("rgba(50, 19, 58, 0.5)");
  rect(width - SPAWN_ZONE_WIDTH, 500, SPAWN_ZONE_WIDTH, 200);
  //Dust spawn
  fill("rgba(50, 19, 58, 0.5)");
  rect(width - SPAWN_ZONE_WIDTH, 500, SPAWN_ZONE_WIDTH, 200);
}

window.setup = function () {
  //createCanvas(windowWidth - 20, windowHeight - 20);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.drawingContext.willReadFrequently = true;
  powerup = sessionStorage.getItem("selectedPowerup") || "None";
  bigBarW = windowWidth / 2;
};

function selectBubbleSoldier() {
  if (powerup == "Powerup 1") {
    return bubbleSoldierShieldGif;
  } else if (powerup == "Powerup 2") {
    return bubbleSoldierChestplateGif;
  } else if (powerup == "Powerup 3") {
    return bubbleSoldierHelmetGif;
  } else {
    return bubbleSoldierPlainGif;
  }
}

function selectDustSoldier() {
  if (powerup == "Powerup 1") {
    return dustSoldierShieldGif;
  } else if (powerup == "Powerup 2") {
    return dustSoldierCloakGif;
  } else if (powerup == "Powerup 3") {
    return dustSoldierHelmetGif;
  } else {
    return dustSoldierPlainGif;
  }
}

window.mousePressed = function () {
  // Cannon shot
  if (mouseInLanes()) {
    if (mouseX <= SPAWN_ZONE_WIDTH) {
      let bubble = {
        x: mouseX - BUBBLE_TROOP_WIDTH / 2,
        y: mouseY - TROOP_HEIGHT / 2,
        d: random(10, 15),
        speed: random(0.2, 0.5),
        dir: 1,
        color: color("lightblue"),
        img: selectBubbleSoldier(),
      };
      bubbleTroops.push(bubble);
    } else if (mouseX >= width - SPAWN_ZONE_WIDTH) {
      let dust = {
        x: mouseX + DUST_TROOP_WIDTH / 2,
        y: mouseY - TROOP_HEIGHT / 2,
        d: random(10, 15),
        speed: random(-0.2, -0.5),
        dir: -1,
        color: color("tan"),
        img: selectDustSoldier(),
      };
      dustTroops.push(dust);
    }
  }
};

window.preload = function () {
  backgroundImage = loadImage(
    "../media/assets/background/modeled-background-no-color.png"
  );

  bubbleSoldierPlainGif = loadImage(
    "../media/assets/characters/bubble-empty.gif"
  );
  bubbleSoldierHelmetGif = loadImage(
    "../media/assets/characters/bubble-helmet.gif"
  );
  bubbleSoldierChestplateGif = loadImage(
    "../media/assets/characters/bubble-chestplate.gif"
  );
  bubbleSoldierShieldGif = loadImage(
    "../media/assets/characters/bubble-shield.gif"
  );

  dustSoldierPlainGif = loadImage("../media/assets/characters/dust-empty.gif");
  dustSoldierHelmetGif = loadImage(
    "../media/assets/characters/dust-helmet.gif"
  );
  dustSoldierCloakGif = loadImage("../media/assets/characters/dust-cloak.gif");
  dustSoldierShieldGif = loadImage(
    "../media/assets/characters/dust-shield.gif"
  );
};

window.draw = function () {
  background(backgroundImage);
  drawLanesAndSpawns();

  noFill();
  rect(barX, barY, bigBarW, barH);

  squareMove();

  barW = constrain(barW, 0, bigBarW);
  fill("red");
  rect(barX, barY, barW, barH);

  for (let b of bubbleTroops) {
    b.x += b.speed * b.d;
    image(b.img, b.x, b.y, BUBBLE_TROOP_WIDTH, TROOP_HEIGHT);
  }

  for (let d of dustTroops) {
    d.x += d.speed * d.d;
    push();
    scale(-1, 1);
    image(d.img, -d.x, d.y, DUST_TROOP_WIDTH, TROOP_HEIGHT);
    pop();
  }
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  bigBarW = windowWidth / 2;
};
