"use strict";

const socket = io();

let barrelData = {};
let cannonData = {};

socket.on("barrelData", (data) => {
  barrelData = data;
});

socket.on("cannonData", (data) => {
  cannonData = data;
});

let squareX = 100;
let squareY = 200;
let circleX = 400;
let circleY = 200;
let circleD = 100;
let squareA = 100;

function squareMove() {
  // Square is the Barrel Rotary Encoder

  if (barrelData.barrelDirection == "Clockwise") {
    squareX += 5;
  } else if (barrelData.barrelDirection == "Counter-Clockwise") {
    // WILL BECOME BarrelRotation = CounterClockwise
    squareX -= 5;
  }
}

function circleMove() {
  // Circle is the Barrel Powerup Rotary Encoder

  if (barrelData.barrelPowerup == "Powerup 1") {
    // (49 = 1 key) WILL BECOME BarrelPowerup = 1st value
    circleY = 50;
  } else if (barrelData.barrelPowerup == "Powerup 2") {
    // (50 = 2 key) WILL BECOME BarrelPowerup = 2nd value
    circleY = 150;
  } else if (barrelData.barrelPowerup == "Powerup 3") {
    // (51 = 3 key) WILL BECOME BarrelPowerup = 3rd value
    circleY = 250;
  }
}

function squareIncrease() {
  if (barrelData.barrelPressed == "Button Pressed") {
    // (84 is T KEY) WILL BECOME BarrelPressed
    squareA += 1;
  } else if (keyIsDown(89)) {
    // 89 is Y KEY
    squareA -= 1;
  }
}

function circleIncrease() {
  if (barrelData.barrelPowerupPressed == "Button Pressed") {
    // (32 is spacebar) WILL BECOME BarrelPoweupPressed
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
