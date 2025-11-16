"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";

const CONTROLLER = new KeyboardController();

const SPIN_THRESHOLD = 10;

let bgImage;
let tableImage;
let scrollImage;
let progressBar;
let barrelImg;
let dustCloak;
let dustHelmet;
let dustShield;

let strongAgainst = '';

let spinCount = 0;
let powerup;
let fillPercent = 0;

let germania;

let powerupX, powerupY;


let selectedPowerup = "dustShield"; // 'dustShield', 'dustCloak', 'dustHelmet'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

window.preload = function () {
  progressBar = loadImage("../media/assets/ui/new-bubble-bar.png");
  bgImage = loadImage("../media/assets/backgrounds/layout-dirty.png");
  scrollImage = loadImage("../media/assets/ui/scroll.png");
  tableImage = loadImage("../media/assets/ui/table.png")
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  dustCloak = loadImage("../media/assets/armor/dust-cloak.png");
  dustHelmet = loadImage("../media/assets/armor/dust-helmet.png");
  dustShield = loadImage("../media/assets/armor/dust-shield.png");
  germania = loadFont("../media/fonts/Germania_One/GermaniaOne-Regular.ttf");
};

function drawDustFillBar() {             // Adjust if bar should be bigger/smaller
  const fullWidth = 300 * 2;
  const fullHeight = 40;

  const barX = width * 0.6;
  const barY = height * 0.1;
  const r = fullHeight / 2;

  const x = barX - fullWidth + 175;
  const y = barY - fullHeight / 2;

  // Draw empty bar (border only)
  noFill();
  stroke(0);        // black border
  strokeWeight(3);
  rect(x, y, fullWidth, fullHeight, r);
  //rect(-200, -100, barX - fullWidth / 2, barY - fullHeight / 2, 200); // optional corner radius 10

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(x, y, fullWidth, fullHeight, r);
  drawingContext.clip();

  // Draw filled portion
  noStroke();
  fill(103, 50, 126); // your purple color
  rect(x, y, (fullWidth * fillPercent), fullHeight, r);
  //rect(-200, -100, (barX - fullWidth / 2) * fillPercent, barY - fullHeight / 2, 200);

  //pop();
  drawingContext.restore();

  // Draw percent text centered ON the bar
  push();
  textAlign(CENTER, CENTER);
  textFont(germania);
  stroke(0);
  strokeWeight(6);
  fill(255);

  textSize(32);
  text(int(fillPercent * 100) + "%", barX - 145, barY); // centered on the bar
  pop();
}


function increaseProgress() {
  if (!locked) return;

  spinCount = CONTROLLER.getBarrelSpins();   // SPACE increments this

  // Convert spins → percent
  fillPercent = Math.min(spinCount / SPIN_THRESHOLD, 1);

  if (fillPercent >= 1 && !window.transitioning) {
    window.transitioning = true;

    setTimeout(() => {
      sessionStorage.setItem("fromBarrelScreen", "true");
      sessionStorage.setItem("selectedSet", "dust");
      window.location.href = "lanes-screen.html";
    }, 1000);
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
    } else if (selectedPowerup === "dustCloak") {
      strongAgainst = "Shield";
    } else if (selectedPowerup === "dustHelmet") {
      strongAgainst = "Chestplate";
    }

    sessionStorage.setItem("selectedPowerup", powerup);

    // setTimeout(() => { barrelScreenVisible = true; }, 1000);
    // setTimeout(() => {
    //   text("Spin the Barrel!", 200, 300);
    // }, 500);
  }
}

const getScale = (powerupName) =>
  selectedPowerup === powerupName ? selectedScaleFactor : scaleFactor;

window.setup = function () {
  sessionStorage.removeItem("selectedPowerup");
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  const barrelX = windowWidth / 2;
  const barrelY = (windowHeight * 6) / 8;

  powerupX = barrelX;
  powerupY = barrelY - barrelImg.height * 0.5;

};


function drawBackground() {
  background(0);
  image(bgImage, width / 2, height / 2, width, height);
}

function drawScrollPanel() {
  const scrollX = width * 0.78;
  const scrollY = height * 0.45;

  image(scrollImage, scrollX, scrollY, scrollImage.width * 0.75, scrollImage.height * 0.75);

  if (locked) {
    textAlign(CENTER);
    fill(80);
    noStroke();
    textSize(34);
    textFont(germania);
    text(`beats`, scrollX, scrollY - scrollImage.height * 0.1);

    fill("#964B00");
    textSize(48);
    text(strongAgainst, scrollX, scrollY + scrollImage.height * 0.02);
  }
}

function drawBarrel() {
  const barrelX = windowWidth / 2;
  const barrelY = (windowHeight * 6) / 8;

  image(
    barrelImg,
    barrelX,
    barrelY,
    barrelImg.width * .4,
    barrelImg.height * .4
  );
}

function drawTable() {
  const tableX = width * 0.5;
  const tableY = height * 0.72;

  // You can adjust the scaling factor as needed
  const scale = 0.9;

  image(
    tableImage,
    tableX,
    tableY,
    tableImage.width * scale,
    tableImage.height * scale
  );
}

function drawCurrentPowerup() {
  if (!selectedPowerup) return;

  let img;

  if (selectedPowerup === "dustShield") img = dustShield;
  else if (selectedPowerup === "dustCloak") img = dustCloak;
  else if (selectedPowerup === "dustHelmet") img = dustHelmet;

  const s = getScale(selectedPowerup);

  image(img, powerupX - 50, powerupY, img.width * s, img.height * s);
}


function drawPowerupInfo() {
  if (!locked || !selectedPowerup) return;

  textAlign(CENTER);
  textFont(germania);
  textSize(28);
  fill("white");
}


window.draw = function () {
  drawBackground();
  drawTable();
  drawDustFillBar();
  drawScrollPanel();
  drawCurrentPowerup();
  drawBarrel();
  drawPowerupInfo();

  // Reset alignment
  textAlign(CENTER);
  fill("white");

  // Input handlers
  selectPowerUp();
  increaseProgress();
};

window.windowResized = function () {
  rive.resizeDrawingSurfaceToCanvas();
  resizeCanvas(windowWidth, windowHeight);
};
