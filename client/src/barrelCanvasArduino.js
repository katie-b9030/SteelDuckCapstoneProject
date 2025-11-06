"use strict";

import { ArduinoController } from "../controllers/ArduinoController.js";

const controller = new ArduinoController();

const SPIN_THRESHOLD = 5;

let progressBar;
let barrelImg;
let bubbleChestplate;
let bubbleHelmet;
let bubbleShield;
let barrelScreenVisible = false;

let spinCount =0;
let powerup;
let fillBarWidth = 0;

let selectedPowerup; // 'bubbleShield', 'square', 'triangle'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

window.preload = function () {
  progressBar = loadImage("../media/assets/ui/Bubble_Bar_Empty.png"); 
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  bubbleChestplate = loadImage("../media/assets/armor/bubble_chestplate.png");
  bubbleHelmet = loadImage("../media/assets/armor/bubble_helmet.png");
  bubbleShield = loadImage("../media/assets/armor/bubble_shield.png");
};

function fillBubbleBar(bubbleBar, x, y) {
  noStroke();
  fill("#02c3d1");
  rect(x, y, fillBarWidth, bubbleBar.height, 50);
}

function increaseProgress() {
  if (locked && controller.getBarrelSpins()) {
    // only start this if powerup has been selected
    spinCount = controller.getBarrelSpins();
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
          window.location.href = "Capstone-Canvas-test.html";
        }, 1000);
      }
    }
  }
}

function selectPowerUp() {
  if (locked) return;

  powerup = controller.getBarrelPowerup();

  if (powerup == "Powerup 1") selectedPowerup = "bubbleShield";
  else if (powerup == "Powerup 2") selectedPowerup = "square";
  else if (powerup == "Powerup 3") selectedPowerup = "triangle";

  if (
    controller.getBarrelPowerupPressed() == "Button Pressed" &&
    selectedPowerup
  ) {
    locked = true;
    // add a glow around image?
    
    // if (selectedPowerup === "bubbleShield") bubbleShieldColor = "#c23fd1";
    // if (selectedPowerup === "square") squareColor = "#c23fd1";
    // if (selectedPowerup === "triangle") triColor = "#c23fd1";

    sessionStorage.setItem("selectedPowerup", powerup);

    // setTimeout(() => { barrelScreenVisible = true; }, 1000);
    setTimeout(() => {
      text("Spin the Barrel!", 200, 300);
    }, 500);
  }
}

window.setup = function () {
  sessionStorage.removeItem("selectedPowerup");
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
};

window.draw = function () {
  background("#363947");

  let bubbleShieldX = windowWidth * 1/4;    
  let bubbleChestplateX = windowWidth * 2/4; 
  let bubbleHelmetX = windowWidth * 3/4;     
  let bubbleShieldY = windowHeight / 2;
  let bubbleChestplateY = windowHeight / 2;
  let bubbleHelmetY = windowHeight / 2;


  let x = windowWidth / 2;
  let y = windowHeight * 1/10;
  fillBubbleBar(progressBar, x, y);

  image(progressBar, x, y);

  // image(barrelImg, width / 2, height / 2);

  image(bubbleShield, bubbleShieldX, bubbleShieldY, bubbleShield.width * scaleFactor, bubbleShield.height * scaleFactor);
  image(bubbleChestplate, bubbleChestplateX, bubbleChestplateY, bubbleChestplate.width * scaleFactor, bubbleChestplate.height * scaleFactor);
  image(bubbleHelmet, bubbleHelmetX, bubbleHelmetY, bubbleHelmet.width * scaleFactor, bubbleHelmet.height * scaleFactor);

  selectPowerUp();
  increaseProgress();
};
