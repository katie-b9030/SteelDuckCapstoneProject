"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";
//import { Rive } from "@rive-app/canvas";

const CONTROLLER = new KeyboardController();
// const RIVE = new Rive({
//   src: "../media/assets/armor/testcoin.riv",
//   autoplay: true,
//   onLoad: () => {
//     RIVE.resizeDrawingSurfaceToCanvas();
//   },
// });

const SPIN_THRESHOLD = 5;

let progressBar;
let barrelImg;
let dustCloak;
let dustHelmet;
let dustShield;
let barrelScreenVisible = false;

let strongAgainst = '';
let weakAgainst = '';

let spinCount = 0;
let powerup;
let fillBarWidth = 0;

let selectedPowerup; // 'dustShield', 'dustCloak', 'dustHelmet'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

window.preload = function () {
  progressBar = loadImage("../media/assets/ui/bubble-bar-empty.png"); // Change to dust bar when it comes in
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  dustCloak = loadImage("../media/assets/armor/dust-cloak.png");
  dustHelmet = loadImage("../media/assets/armor/dust-helmet.png");
  dustShield = loadImage("../media/assets/armor/dust-shield.png");
};

function fillDustBar(dustBar, x, y) {
  noStroke();
  fill("#02c3d1");
  rect(x, y, fillBarWidth, dustBar.height, 50);
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
          sessionStorage.setItem("selectedSet", "dust");

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

  if (powerup == "Powerup 1") selectedPowerup = "dustShield";
  else if (powerup == "Powerup 2") selectedPowerup = "dustCloak";
  else if (powerup == "Powerup 3") selectedPowerup = "dustHelmet";

  if (
    CONTROLLER.getBarrelPowerupPressed() == "Button Pressed" &&
    selectedPowerup
  ) {
    locked = true;

    if (selectedPowerup === "dustShield") {
      strongAgainst = "Helmet";
      weakAgainst = "Chestplate";
    } else if (selectedPowerup === "dustCloak") {
      strongAgainst = "Shield";
      weakAgainst = "Helmet";
    } else if (selectedPowerup === "dustHelmet") {
      strongAgainst = "Chestplate";
      weakAgainst = "Shield";
    }

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

  let dustShieldX = windowWidth / 2;
  let dustCloakX = windowWidth / 2;
  let dustHelmetX = windowWidth / 2;
  let dustShieldY = (windowHeight * 2) / 8;
  let dustCloakY = (windowHeight * 3) / 8;
  let dustHelmetY = (windowHeight * 4) / 8;

  let barrelX = windowWidth / 2;
  let barrelY = (windowHeight * 6) / 8;

  let x = windowWidth / 2;
  let y = (windowHeight * 1) / 10;
  fillDustBar(progressBar, x - 430, y - 48);

  image(progressBar, x, y);

  if (!locked || selectedPowerup === "dustShield") {
    image(
      dustShield,
      dustShieldX,
      dustShieldY,
      dustShield.width * getScale("dustShield"),
      dustShield.height * getScale("dustShield")
    );
  }
  if (!locked || selectedPowerup === "dustCloak") {
    image(
      dustCloak,
      dustCloakX,
      dustCloakY,
      dustCloak.width * getScale("dustCloak"),
      dustCloak.height * getScale("dustCloak")
    );
  }
  if (!locked || selectedPowerup === "dustHelmet") {
    image(
      dustHelmet,
      dustHelmetX,
      dustHelmetY,
      dustHelmet.width * getScale("dustHelmet"),
      dustHelmet.height * getScale("dustHelmet")
    );
  }

  image(
    barrelImg,
    barrelX,
    barrelY,
    barrelImg.width * scaleFactor,
    barrelImg.height * scaleFactor
  );

  if (locked && selectedPowerup) {
    textAlign(CENTER);
    textSize(28);
    fill("white");

    let posY;
    if (selectedPowerup == "dustShield") posY = (windowHeight * 2) / 8;
    else if (selectedPowerup == "dustCloak") posY = (windowHeight * 3) / 8;
    else if (selectedPowerup == "dustHelmet") posY = (windowHeight * 4) / 8;

    const posX = windowWidth / 2;
    const imgScale = 0.8;

    text(`Selected: ${selectedPowerup.replace("dust", "")}`, posX, (windowHeight * 1) / 25);

    fill("#FF3333");
    textAlign(RIGHT);
    text(`Weak vs ${weakAgainst}`, posX - 200, posY);

    fill("#00FF00");
    textAlign(CENTER);
    text(`Strong vs ${strongAgainst}`, posX + 300, posY);
  }

  // Reset color and alignment
  fill("white");
  textAlign(CENTER);

  selectPowerUp();
  increaseProgress();
};

window.windowResized = function () {
  rive.resizeDrawingSurfaceToCanvas();
  resizeCanvas(windowWidth, windowHeight);
};