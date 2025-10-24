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

import { KeyboardController } from './KeyboardController.js';
//const socket = io();
//import { ArduinoController } from './ArduinoController.js';

let squareX = 100;
let squareY = 200;
let circleX = 400;
let circleY = 200;
let circleD = 100;
let squareA = 100;
let barX = 10;
let barY = 10;
let bigBarW;
let barH = 20;
let barW = 1;


const controller = new KeyboardController();



let bubbleTroops = [];
let dustTroops = [];

function squareMove() {
  // Square is the Barrel Rotary Encoder
  const dir = controller.getBarrerlDirection();
  if (dir === "Clockwise") barW += 1;
  else if (dir === "Counter-Clockwise") barW -= 1;
}

function circleMove() {
  // Circle is the Barrel Powerup Rotary Encoder

  const power = controller.getBarrelPowerup();
  if (power === "Powerup 1") circleY = 50;
  else if (power === "Powerup 2") circleY = 150;
  else if (power === "Powerup 3") circleY = 250;
}

function squareIncrease() {
  const press = controller.getBarrelPowerupPressed();

  if (press === "Button Pressed") {
    // (32 is spacebar) WILL BECOME barrelPoweupPressed == "Button Pressed"
    circleD += 1;
  } else if (keyIsDown(16)) {
    // 16 is shift
    circleD -= 1;
  }
}


function circleIncrease() {
  const press = controller.getBarrelPowerupPressed();

  if (press === "Button Pressed") {
    // (32 is spacebar) WILL BECOME barrelPoweupPressed == "Button Pressed"
    circleD += 1;
  } else if (keyIsDown(16)) {
    // 16 is shift
    circleD -= 1;
  }
}

function mouseInLanes() {
  return (
    (mouseY >= 50 && mouseY <= 250) || // Lane 1
    (mouseY >= 350 && mouseY <= 550) || // Lane 2
    (mouseY >= 650 && mouseY <= 850) // Lane 3
  );
}

window.setup = function () {
  //createCanvas(windowWidth - 20, windowHeight - 20);
  createCanvas(windowWidth, windowHeight);
  bigBarW = windowWidth / 2;

};

const spawnZoneWidth = 100;

window.mousePressed = function () { // Cannon shot
  if (mouseInLanes()) {
    if (mouseX <= spawnZoneWidth) {
      let bubble = {
        x: mouseX,
        y: mouseY,
        d: random(10, 15),
        speed: random(2, 5),
        dir: 1,
        color: color("lightblue"),
      };
      bubbleTroops.push(bubble);
    }
    else if (mouseX >= width - spawnZoneWidth) {
      let dust = {
        x: mouseX,
        y: mouseY,
        d: random(10, 15),
        speed: random(2, 5),
        dir: -1,
        color: color("tan"),
      };
      dustTroops.push(dust);
    }
  }
}

window.draw = function () {
  background("green");

  fill("grey");
  rect(0, 50, windowWidth, 200);
  rect(0, 350, windowWidth, 200);
  rect(0, 650, windowWidth, 200);

  noStroke();
  fill("rgba(0, 0, 255, 0.15)");
  rect(0, 50, spawnZoneWidth, 200);
  rect(0, 350, spawnZoneWidth, 200);
  rect(0, 650, spawnZoneWidth, 200);

  fill("rgba(255, 200, 0, 0.15)");
  rect(width - spawnZoneWidth, 50, spawnZoneWidth, 200);
  rect(width - spawnZoneWidth, 350, spawnZoneWidth, 200);
  rect(width - spawnZoneWidth, 650, spawnZoneWidth, 200);

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
    b.x += b.speed * b.dir;
    fill(b.color);
    circle(b.x, b.y, b.d);
  }

  for (let d of dustTroops) {
    d.x += d.speed * d.dir;
    fill(d.color);
    circle(d.x, d.y, d.d);
  }
};



window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  bigBarW = windowWidth / 2;
};

