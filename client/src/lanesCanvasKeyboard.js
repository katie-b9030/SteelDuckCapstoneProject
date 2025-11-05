"use strict";

//const socket = io();

//let barrelData = {};
//let cannonData = {};

///socket.on("barrelData", (data) => {
/// barrelData = data;
///});

///socket.on("cannonData", (data) => {
///  cannonData = data;
///});

import { KeyboardController } from "../controllers/KeyboardController.js";
//const socket = io();
//import { ArduinoController } from './ArduinoController.js';

// global consts
const spawnZoneWidth = 100;
const BUBBLE_TROOP_WIDTH = 500;
const DUST_TROOP_WIDTH = 400;
const TROOP_HEIGHT = 350;

// let squareY = 200;
// let circleX = 400;
// let circleY = 200;
// let circleD = 100;
// let squareA = 100;
let barX = 10;
let barY = 10;
let bigBarW;
let barH = 20;
let barW = 1;

// images
let bg_img;
// bubble soldiers
let bubble_soldier_plain_gif;
let bubble_soldier_helmet_gif;
let bubble_soldier_chestplate_gif;
let bubble_soldier_shield_gif;
// dust soldiers
let dust_soldier_plain_gif;
let dust_soldier_helmet_gif;
let dust_soldier_cloak_gif;
let dust_soldier_shield_gif;

const controller = new KeyboardController();

let powerup;

const lanes = [
  { y: 50, h: 200 },
  { y: 350, h: 200 },
  { y: 650, h: 200 },
];

let bubbleTroops = [];
let dustTroops = [];

function squareMove() {
  // Square is the Barrel Rotary Encoder
  const dir = controller.getBarrelDirection();
  if (dir === "Clockwise") barW += 1;
  else if (dir === "Counter-Clockwise") barW -= 1;
}

function mouseInLanes() {
  return (
    (mouseY >= 50 && mouseY <= 250) || // Lane 1
    (mouseY >= 350 && mouseY <= 550) || // Lane 2
    (mouseY >= 650 && mouseY <= 850) // Lane 3
  );
}

function drawLanesAndSpawns() {
  noStroke();

  for (let lane of lanes) {
    // Actual Lanes
    fill("rgba(100, 100, 100, 0.5)");
    rect(0, lane.y, width, lane.h);

    //Bubble spawn
    fill("rgba(35, 85, 221, 0.15)");
    rect(0, lane.y, spawnZoneWidth, lane.h);

    //Dust spawn
    fill("rgba(50, 19, 58, 0.15)");
    rect(width - spawnZoneWidth, lane.y, spawnZoneWidth, lane.h);
  }
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
    return bubble_soldier_shield_gif;
  } else if (powerup == "Powerup 2") {
    return bubble_soldier_chestplate_gif;
  } else if (powerup == "Powerup 3") {
    return bubble_soldier_helmet_gif;
  } else {
    return bubble_soldier_plain_gif;
  }
}

function selectDustSoldier() {
  if (powerup == "Powerup 1") {
    return dust_soldier_shield_gif;
  } else if (powerup == "Powerup 2") {
    return dust_soldier_cloak_gif;
  } else if (powerup == "Powerup 3") {
    return dust_soldier_helmet_gif;
  } else {
    return dust_soldier_plain_gif;
  }
}

window.mousePressed = function () {
  // Cannon shot
  if (mouseInLanes()) {
    if (mouseX <= spawnZoneWidth) {
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
    } else if (mouseX >= width - spawnZoneWidth) {
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
  bg_img = loadImage(
    "../media/assets/background/modeled_background_no_color.png"
  );

  bubble_soldier_plain_gif = loadImage(
    "../media/assets/characters/bubble_empty.gif"
  );
  bubble_soldier_helmet_gif = loadImage(
    "../media/assets/characters/bubble_helmet.gif"
  );
  bubble_soldier_chestplate_gif = loadImage(
    "../media/assets/characters/bubble_chestplate.gif"
  );
  bubble_soldier_shield_gif = loadImage(
    "../media/assets/characters/bubble_shield.gif"
  );

  dust_soldier_plain_gif = loadImage(
    "../media/assets/characters/rabbit_empty.gif"
  );
  dust_soldier_helmet_gif = loadImage(
    "../media/assets/characters/rabbit_helmet.gif"
  );
  dust_soldier_cloak_gif = loadImage(
    "../media/assets/characters/rabbit_cloak.gif"
  );
  dust_soldier_shield_gif = loadImage(
    "../media/assets/characters/rabbit_shield.gif"
  );
};

window.draw = function () {
  // background("green");
  background(bg_img);
  drawLanesAndSpawns();

  noFill();
  rect(barX, barY, bigBarW, barH);

  squareMove();

  barW = constrain(barW, 0, bigBarW);
  fill("red");
  rect(barX, barY, barW, barH);

  //fill("red");
  //square(squareX, squareY, squareA);

  //fill("yellow");
  //circle(circleX, circleY, circleD);

  for (let b of bubbleTroops) {
    b.x += b.speed * b.d;
    // fill(b.color);
    // circle(b.x, b.y, b.d);
    image(b.img, b.x, b.y, BUBBLE_TROOP_WIDTH, TROOP_HEIGHT);
  }

  for (let d of dustTroops) {
    d.x += d.speed * d.d;
    // fill(d.color);
    // circle(d.x, d.y, d.d);
    push();
    scale(-1, 1);
    image(d.img, -d.x, d.y, DUST_TROOP_WIDTH, TROOP_HEIGHT);
    pop();
  }

  // for (let i = bubbleTroops.length - 1; i >= 0; i--) {
  //   let b = bubbleTroops[i];
  //   for (let j = dustTroops.length - 1; j >= 0; j--) {
  //     let d = dustTroops[i];
  //     if (Math.abs(d.x - b.x) < 200 && Math.abs(d.y - b.y < 150)) {
  //       bubbleTroops.splice(i, 1);
  //       dustTroops.splice(i, 1);
  //     }
  //   }
  // }
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  bigBarW = windowWidth / 2;
};
