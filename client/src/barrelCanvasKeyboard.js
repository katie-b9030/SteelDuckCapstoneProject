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

import { KeyboardController } from "../controllers/KeyboardController.js";

const CONTROLLER = new KeyboardController();

const SPIN_THRESHOLD = 5;


let progressBar;
let barrelImg;
let bubbleChestplate;
let bubbleHelmet;
let bubbleShield;
let barrelScreenVisible = false;


let spinCount = 0;
let powerup;
let fillBarWidth = 0;


let selectedPowerup; // 'bubbleShield', 'bubbleChestplate', 'bubbleHelmet'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;



window.preload = function () {
  progressBar = loadImage("../media/assets/ui/bubble-bar-empty.png");
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  bubbleChestplate = loadImage("../media/assets/armor/bubble-chestplate.png");
  bubbleHelmet = loadImage("../media/assets/armor/bubble-helmet.png");
  bubbleShield = loadImage("../media/assets/armor/bubble-shield.png");
};



function fillBubbleBar(bubbleBar, x, y) {
  noStroke();
  fill("#02c3d1");
  rect(x, y, fillBarWidth, bubbleBar.height, 50);
}


function increaseProgress() {
  if (locked && CONTROLLER.getBarrelSpins()) {
    // only start this if powerup has been selected
    spinCount = CONTROLLER.getBarrelSpins();
    if (spinCount < SPIN_THRESHOLD) {
      fillBarWidth = (progressBar.width / SPIN_THRESHOLD) * spinCount;
    } else {
      fillBarWidth = progressBar.width;

      if (!window.transitioning) {
        window.transitioning = true;
        setTimeout(() => {
          // Mark down that we are intentionally changing pages
          sessionStorage.setItem("fromBarrelScreen", "true");

          // Go to the next page
          window.location.href = "lanes-screen.html";
        }, 1000);
      }
    }
  }
}




function selectPowerUp() {
  if (locked) return;

  powerup = CONTROLLER.getBarrelPowerup();

  if (powerup == "Powerup 1") selectedPowerup = "bubbleShield";
  else if (powerup == "Powerup 2") selectedPowerup = "bubbleChestplate";
  else if (powerup == "Powerup 3") selectedPowerup = "bubbleHelmet";

  if (
    CONTROLLER.getBarrelPowerupPressed() == "Button Pressed" &&
    selectedPowerup
  ) {
    locked = true;
    
    sessionStorage.setItem("selectedPowerup", powerup);

    // setTimeout(() => { barrelScreenVisible = true; }, 1000);
    setTimeout(() => {
      text("Spin the Barrel!", 200, 300);
    }, 500);
  }
}

const getScale = (powerupName) =>
  selectedPowerup === powerupName ? selectedScaleFactor : scaleFactor;


window.setup = function () {
  sessionStorage.removeItem("selectedPowerup");
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
};

window.draw = function () {
  background("#363947");

  let bubbleShieldX = windowWidth / 2;
  let bubbleChestplateX = windowWidth / 2;
  let bubbleHelmetX = windowWidth / 2;
  let bubbleShieldY = (windowHeight * 2) / 8;
  let bubbleChestplateY = (windowHeight * 3) / 8;
  let bubbleHelmetY = (windowHeight * 4) / 8;

  let barrelX = windowWidth / 2;
  let barrelY = (windowHeight * 6) / 8;

  let x = windowWidth / 2;
  let y = (windowHeight * 1) / 10;
  fillBubbleBar(progressBar, x-430, y-48);

  image(progressBar, x, y);

  image(
    bubbleShield,
    bubbleShieldX,
    bubbleShieldY,
    bubbleShield.width * getScale("bubbleShield"),
    bubbleShield.height * getScale("bubbleShield")
  );
  image(
    bubbleChestplate,
    bubbleChestplateX,
    bubbleChestplateY,
    bubbleChestplate.width * getScale("bubbleChestplate"),
    bubbleChestplate.height * getScale("bubbleChestplate")
  );
  image(
    bubbleHelmet,
    bubbleHelmetX,
    bubbleHelmetY,
    bubbleHelmet.width * getScale("bubbleHelmet"),
    bubbleHelmet.height * getScale("bubbleHelmet")
  );

  image(
    barrelImg,
    barrelX,
    barrelY,
    barrelImg.width * scaleFactor,
    barrelImg.height * scaleFactor
  );

  selectPowerUp();
  increaseProgress();
};









// let progressBar;
// let fillBar;

// let spinCount;
// let powerup;
// let fillBarWidth = 0;

// let circleX = 250,
//   circleY = 350,
//   circleSize = 200;
// let squareX = 650,
//   squareY = 250,
//   squareSize = 200;
// let triCenterX = 1250,
//   triCenterY = 350,
//   triWidth = 200,
//   triHeight = 200;

// let selectedShape; // 'circle', 'square', 'triangle'
// let locked = false;
// let scaleFactor = 1.5;

// let circleColor = "#2355ddff";
// let squareColor = "#2355ddff";
// let triColor = "#2355ddff";

// function preload() {
//   progressBar = loadImage("../media/assets/Bubble_Bar_Empty.png"); // path to your image
// }

// function fillBubbleBar(bubbleBar, x, y) {
//   noStroke();
//   fill("#02c3d1");
//   fillBar = rect(x, y, fillBarWidth, bubbleBar.height, 50);
// }

// function increaseProgress() {
//   if (locked) {
//     // only start this if powerup has been selected
//     spinCount = CONTROLLER.getBarrelSpin();
//     if (spinCount < 10) {
//       fillBarWidth = (progressBar.width / 10) * spinCount;
//     } else {
//       fillBarWidth = progressBar.width;

//       if (!window.transitioning) {
//         window.transitioning = true;
//         setTimeout(() => {
//           // Mark down that we are intentionally changing pages
//           sessionStorage.setItem("fromBarrelScreen", "true");

//           // Go to the next page
//           window.location.href = "Capstone-Canvas-test.html";
//         }, 1000);
//       }
//     }
//   }
// }

// function selectPowerUp() {
//   if (locked) return;

//   powerup = CONTROLLER.getBarrelPowerup();

//   if (powerup == "Powerup 1") selectedShape = "circle";
//   else if (powerup == "Powerup 2") selectedShape = "square";
//   else if (powerup == "Powerup 3") selectedShape = "triangle";

//   if (
//     CONTROLLER.getBarrelPowerupPressed() == "Button Pressed" &&
//     selectedShape
//   ) {
//     locked = true;
//     if (selectedShape === "circle") circleColor = "#c23fd1";
//     if (selectedShape === "square") squareColor = "#c23fd1";
//     if (selectedShape === "triangle") triColor = "#c23fd1";
//   }
// }

// window.setup = function () {
//   createCanvas(1500, 650);
//   preload();
// };

// window.draw = function () {
//   background("#363947");

//   let x = (width - progressBar.width) / 2;
//   let y = 20;

//   fillBubbleBar(progressBar, x, y);

//   image(progressBar, x, y);

//   fill(circleColor);
//   let cSize =
//     selectedShape === "circle" ? circleSize * scaleFactor : circleSize;
//   circle(circleX, circleY, cSize);

//   fill(squareColor);
//   let sSize =
//     selectedShape === "square" ? squareSize * scaleFactor : squareSize;
//   let offsetX = selectedShape === "square" ? -50 : 0;
//   let offsetY = selectedShape === "square" ? -50 : 0;
//   square(squareX + offsetX, squareY + offsetY, sSize);

//   fill(triColor);
//   let tW = selectedShape === "triangle" ? triWidth * scaleFactor : triWidth;
//   let tH = selectedShape === "triangle" ? triHeight * scaleFactor : triHeight;
//   triangle(
//     triCenterX,
//     triCenterY - tH / 2,
//     triCenterX - tW / 2,
//     triCenterY + tH / 2,
//     triCenterX + tW / 2,
//     triCenterY + tH / 2
//   );

//   selectPowerUp();
//   increaseProgress();
// };
