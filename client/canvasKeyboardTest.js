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

let squareX = 100;
let squareY = 200;
let circleX = 400;
let circleY = 200;
let circleD = 100;
let squareA = 100;

function squareMove() {
  // Square is the Barrel Rotary Encoder

  if (keyIsDown(RIGHT_ARROW)) { // barrelDirection == "Clockwise"
    squareX += 5;
  } else if (keyIsDown(LEFT_ARROW)) { // barrelDirection = "Counter-Clockwise"
    squareX -= 5;
  }
}

function circleMove() {
  // Circle is the Barrel Powerup Rotary Encoder

  if (keyIsDown(49)) { // (49 = 1 key) WILL BECOME barrelPowerup == "Powerup 1"
    circleY = 50;
  } else if (keyIsDown(50)) { // (50 = 2 key) WILL BECOME barrelPowerup == "Powerup 2"
    circleY = 150;
  } else if (keyIsDown(51)) { // (51 = 3 key) WILL BECOME barrelPowerup == "Powerup 3"
    circleY = 250;
  }
}

function squareIncrease() {
  if (keyIsDown(84)) {
    // (84 is T KEY) WILL BECOME barrelPressed == "Button Pressed"
    squareA += 1;
  } else if (keyIsDown(89)) {
    // 89 is Y KEY
    squareA -= 1;
  }
}

function circleIncrease() {
  if (keyIsDown(32)) {
    // (32 is spacebar) WILL BECOME barrelPoweupPressed == "Button Pressed"
    circleD += 1;
  } else if (keyIsDown(16)) {
    // 16 is shift
    circleD -= 1;
  }
}

window.setup = function () {
  createCanvas(600, 400);
};

window.draw = function () {
  background("black");

  squareMove();
  circleMove();
  circleIncrease();
  squareIncrease();

  fill("red");
  square(squareX, squareY, squareA);

  fill("yellow");
  circle(circleX, circleY, circleD);
};
