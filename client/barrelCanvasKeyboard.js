"use strict";

// const socket = io();

// let barrelData = {};
// let cannonData = {};

// socket.on("barrelData", (data) => {
//   barrelData = data;
// });

// socket.on("cannonData", (data) => {
//   cannonData = data;
// });

// let squareX = 100;
// let squareY = 200;
// let circleX = 400;
// let circleY = 200;
// let circleD = 100;
// let squareA = 100;

import { BarrelKeyboardController } from "./barrelKeyboardController.js";

const controller = new BarrelKeyboardController();


let progressBar;
let fillBar;

let spinCount;
let powerup;
let fillBarWidth = 0;

let circleX = 250, circleY = 350, circleSize = 200;
let squareX = 650, squareY = 250, squareSize = 200;
let triCenterX = 1250, triCenterY = 350, triWidth = 200, triHeight = 200;

let selectedShape; // 'circle', 'square', 'triangle'
let locked = false;
let scaleFactor = 1.5;

let circleColor = '#2355ddff';
let squareColor = '#2355ddff';
let triColor = '#2355ddff';

function preload() {
  progressBar = loadImage("../media/assets/Bubble_Bar_Empty.png"); // path to your image
}

function fillBubbleBar(bubbleBar, x, y) {
  noStroke();
  fill('#02c3d1');
  fillBar = rect(x, y, fillBarWidth, bubbleBar.height, 50);
}

function increaseProgress() {
  if(locked) {    // only start this if powerup has been selected
    spinCount = controller.getBarrelSpin();
    if(spinCount < 10) {
      fillBarWidth = (progressBar.width/10) * spinCount;
    }
    else {
      fillBarWidth = progressBar.width

      if (!window.transitioning) {
        window.transitioning = true;
        setTimeout(() => {
          // Mark down that we are intentionally changing pages
          sessionStorage.setItem("fromBarrelScreen", "true");

          // Go to the next page
          window.location.href = "Capstone-Canvas-test.html";
        }, 1000);
        
      }
    }
  }
}

function selectPowerUp() {
  if (locked) return; 

  powerup = controller.getBarrelPowerup();

  if (powerup == "Powerup 1") selectedShape = 'circle';
  else if (powerup == "Powerup 2") selectedShape = 'square';
  else if (powerup == "Powerup 3") selectedShape = 'triangle';

  if (controller.getBarrelPowerupPressed() == "Button Pressed" && selectedShape) {
    locked = true;
    if (selectedShape === 'circle') circleColor = '#c23fd1';      
    if (selectedShape === 'square') squareColor = '#c23fd1';
    if (selectedShape === 'triangle') triColor = '#c23fd1';
  }
}

window.setup = function () {
  createCanvas(1500, 650);
  preload();
};

window.draw = function () {
  background("#363947");

  let x = (width - progressBar.width) / 2;
  let y = 20;

  

  fillBubbleBar(progressBar, x, y);

  image(progressBar, x, y);  

  fill(circleColor);
  let cSize = (selectedShape === 'circle') ? circleSize * scaleFactor : circleSize;
  circle(circleX, circleY, cSize);

  fill(squareColor);
  let sSize = (selectedShape === 'square') ? squareSize * scaleFactor : squareSize;
  let offsetX = (selectedShape === 'square') ? -50 : 0;
  let offsetY = (selectedShape === 'square') ? -50 : 0;
  square(squareX + offsetX, squareY + offsetY, sSize);

  fill(triColor);
  let tW = (selectedShape === 'triangle') ? triWidth * scaleFactor : triWidth;
  let tH = (selectedShape === 'triangle') ? triHeight * scaleFactor : triHeight;
  triangle(
    triCenterX, triCenterY - tH / 2,
    triCenterX - tW / 2, triCenterY + tH / 2,
    triCenterX + tW / 2, triCenterY + tH / 2
  );

  selectPowerUp();
  increaseProgress();
};
