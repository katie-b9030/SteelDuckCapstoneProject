"use strict";

import { ArduinoController } from "../controllers/ArduinoController.js";

const CONTROLLER = new ArduinoController();

const SPIN_THRESHOLD = 5;

let progressBar;
let barrelImg;
let bubbleChestplate;
let bubbleHelmet;
let bubbleShield;
let backgroundImage;
let barrelScreenVisible = false;

let spinCount = 0;
let powerup;
let fillBarWidth = 0;

let selectedPowerup; // 'bubbleShield', 'square', 'triangle'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

let numFrames = 120;
let currentFrame = 0;
let bubbleShieldFrames = [];

window.preload = function () {
  backgroundImage = loadImage("../media/assets/background/layout-clean.png");
  progressBar = loadImage("../media/assets/ui/bubble-bar-empty.png");
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  bubbleChestplate = loadImage("../media/assets/armor/bubble-chestplate.png");
  bubbleHelmet = loadImage("../media/assets/armor/bubble-helmet.png");
  bubbleShield = loadImage("../media/assets/armor/bubble-shield.png");

  for (let i = 0; i < numFrames; i++) {
    bubbleShieldFrames[i] = loadImage(
      `../media/assets/armor/bubbleShield/bubble-shield${i + 1}.png`
    );
  }
};

function fillBubbleBar(bubbleBar, x, y) {
  noStroke();
  fill("#02c3d1");
  rect(x, y, fillBarWidth, bubbleBar.height, 50);
}

function increaseProgress() {
  if (locked && CONTROLLER.getBubbleSpins()) {
    // only start this if powerup has been selected
    spinCount = CONTROLLER.getBubbleSpins();
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
          window.location.href = "capstone-canvas-test.html";
        }, 1000);
      }
    }
  }
}

function selectPowerUp() {
  if (locked) return;

  powerup = CONTROLLER.getBubblePowerup();

  if (powerup == "shield") selectedPowerup = "bubbleShield";
  else if (powerup == "Powerup 2") selectedPowerup = "bubbleChestplate";
  else if (powerup == "Powerup 3") selectedPowerup = "bubbleHelmet";

  if (CONTROLLER.getBubblePressed() == "Button Pressed" && selectedPowerup) {
    locked = true;
    // add a glow around image?

    // if (selectedPowerup === "bubbleShield") bubbleShieldColor = "#c23fd1";
    // if (selectedPowerup === "square") squareColor = "#c23fd1";
    // if (selectedPowerup === "triangle") triColor = "#c23fd1";

    //sessionStorage.setItem("selectedPowerup", powerup);
    window.POWERUP;

    // setTimeout(() => { barrelScreenVisible = true; }, 1000);
    setTimeout(() => {
      text("Spin the Barrel!", 200, 300);
    }, 500);
  }
}

function drawBackground() {
  let imgAspect = backgroundImage.width / backgroundImage.height;
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
  image(backgroundImage, width / 2, height / 2, drawWidth, drawHeight);

  // fill(255, 255, 255, 25);
  // rect(0, 0, windowWidth, windowHeight);
}

function changeCurrentFrame() {
  if (currentFrame < numFrames - 1) {
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
  fillBubbleBar(progressBar, x, y);

  image(progressBar, x, y);

  // image(
  //   bubbleShield,
  //   bubbleShieldX,
  //   bubbleShieldY,
  //   bubbleShield.width * scaleFactor,
  //   bubbleShield.height * scaleFactor
  // );
  let shieldFrame = bubbleShieldFrames[currentFrame];
  image(
    shieldFrame,
    bubbleShieldX,
    bubbleShieldY,
    shieldFrame.width * scaleFactor,
    shieldFrame.height * scaleFactor
  );
  console.log(bubbleShieldFrames[currentFrame]);
  image(
    bubbleChestplate,
    bubbleChestplateX,
    bubbleChestplateY,
    bubbleChestplate.width * scaleFactor,
    bubbleChestplate.height * scaleFactor
  );
  image(
    bubbleHelmet,
    bubbleHelmetX,
    bubbleHelmetY,
    bubbleHelmet.width * scaleFactor,
    bubbleHelmet.height * scaleFactor
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
  changeCurrentFrame();
};
