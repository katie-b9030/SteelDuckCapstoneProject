"use strict";

import { ArduinoController } from "../controllers/ArduinoController.js";
import { preloadBubbleBarrelImages } from "../game/asset-management/imageAssets.js";

const CONTROLLER = new ArduinoController();

const SPIN_THRESHOLD = 5;

// let progressBar;
// let barrelImg;
// let bubbleChestplate;
// let bubbleHelmet;
// let bubbleShield;
// let backgroundImage;
let barrelScreenVisible = false;

let spinCount = 0;
let powerup;
let fillBarWidth = 0;

let selectedPowerup; // 'bubbleShield', 'square', 'triangle'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

let currentFrame = 0;

window.preload = function () {
  preloadBubbleBarrelImages();
};

function fillBubbleBar(bubbleBar, x, y) {
  noStroke();
  fill("#02c3d1");
  rect(x, y, fillBarWidth, bubbleBar.height, 50);
}

// function increaseProgress() {
//   if (locked && CONTROLLER.getBubbleSpins()) {
//     // only start this if powerup has been selected
//     spinCount = CONTROLLER.getBubbleSpins();
//     if (spinCount < SPIN_THRESHOLD) {
//       fillBarWidth =
//         (IMAGES.bubbleProgressBar.width / SPIN_THRESHOLD) * spinCount;
//     } else {
//       fillBarWidth = IMAGES.bubbleProgressBar.width;

//       // if (!window.transitioning) {
//       //   window.transitioning = true;
//       //   setTimeout(() => {
//       //     // Mark down that we are intentionally changing pages
//       //     sessionStorage.setItem("fromBarrelScreen", "true");

//       //     // Go to the next page
//       //     window.location.href = "capstone-canvas-test.html";
//       //   }, 1000);
//       // }
//     }
//   }
// }

// function selectPowerUp() {
//   if (locked) return;

//   powerup = CONTROLLER.getBubblePowerup();

//   if (powerup == "shield") selectedPowerup = "bubbleShield";
//   else if (powerup == "Powerup 2") selectedPowerup = "bubbleChestplate";
//   else if (powerup == "Powerup 3") selectedPowerup = "bubbleHelmet";

//   if (CONTROLLER.getBubblePressed() == "Button Pressed" && selectedPowerup) {
//     locked = true;
//     // add a glow around image?

//     // if (selectedPowerup === "bubbleShield") bubbleShieldColor = "#c23fd1";
//     // if (selectedPowerup === "square") squareColor = "#c23fd1";
//     // if (selectedPowerup === "triangle") triColor = "#c23fd1";

//     //sessionStorage.setItem("selectedPowerup", powerup);
//     window.POWERUP;

//     // setTimeout(() => { barrelScreenVisible = true; }, 1000);
//     setTimeout(() => {
//       text("Spin the Barrel!", 200, 300);
//     }, 500);
//   }
// }

function drawBackground() {
  let imgAspect =
    IMAGES.bubbleBarrelBackgroundImage.width /
    IMAGES.bubbleBarrelBackgroundImage.height;
  let canvasAspect = width / height;

  let drawWidth, drawHeight;

  if (canvasAspect > imgAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  imageMode(CENTER);
  image(
    IMAGES.bubbleBarrelbackgroundImage,
    width / 2,
    height / 2,
    drawWidth,
    drawHeight
  );

  // fill(255, 255, 255, 25);
  // rect(0, 0, windowWidth, windowHeight);
}

function changeCurrentFrame() {
  if (currentFrame < numDefaultFrames - 1) {
    currentFrame++;
  } else {
    currentFrame = 0;
  }
}

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
};

window.draw = function () {
  drawBackground();

  let bubbleShieldX = width / 2;
  let bubbleChestplateX = width / 2;
  let bubbleHelmetX = width / 2;
  let bubbleShieldY = (height * 2) / 8;
  let bubbleChestplateY = (height * 3) / 8;
  let bubbleHelmetY = (height * 4) / 8;

  let barrelX = width / 2;
  let barrelY = (height * 6) / 8;

  let x = width / 2;
  let y = (height * 1) / 10;
  fillBubbleBar(IMAGES.bubbleProgressBar, x, y);

  image(IMAGES.bubbleProgressBar, x, y);

  // image(
  //   bubbleShield,
  //   bubbleShieldX,
  //   bubbleShieldY,
  //   bubbleShield.width * scaleFactor,
  //   bubbleShield.height * scaleFactor
  // );
  let shieldFrame = IMAGES.bubbleShieldFrames[currentFrame];
  image(
    shieldFrame,
    bubbleShieldX,
    bubbleShieldY,
    shieldFrame.width * scaleFactor,
    shieldFrame.height * scaleFactor
  );
  let chestFrame = IMAGES.bubbleChestFrames[currentFrame];
  image(
    chestFrame,
    bubbleChestplateX,
    bubbleChestplateY,
    bubbleChestplate.width * scaleFactor,
    bubbleChestplate.height * scaleFactor
  );
  let helmetFrame = IMAGES.bubbleHelmetFrames[currentFrame];
  image(
    helmetFrame,
    bubbleHelmetX,
    bubbleHelmetY,
    bubbleHelmet.width * scaleFactor,
    bubbleHelmet.height * scaleFactor
  );

  image(
    IMAGES.barrel,
    barrelX,
    barrelY,
    barrelImg.width * scaleFactor,
    barrelImg.height * scaleFactor
  );

  // selectPowerUp();
  // increaseProgress();
  changeCurrentFrame();
};
