"use strict";
import { preloadLanesImages } from "../game/asset-management/imageAssets.js";

window.ASSETS_READY = false;

let strongAgainst = "";
let fillPercent;

let germania;

let powerupX, powerupY;

let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

window.preload = function () {
  preloadLanesImages().then(() => {
    window.ASSETS_READY = true;
  });

  germania = loadFont("../media/fonts/Germania_One/GermaniaOne-Regular.ttf");
};

function setStrongAgainst() {
  if (BUBBLE_POWERUP === Troop.POWERUP.SHIELD) {
    strongAgainst = Troop.POWERUP.HELMET;
  } else if (BUBBLE_POWERUP === Troop.POWERUP.CHEST) {
    strongAgainst = Troop.POWERUP.SHIELD;
  } else if (BUBBLE_POWERUP === Troop.POWERUP.HELMET) {
    strongAgainst = Troop.POWERUP.CHEST;
  }
}

function drawDustFillBar() {
  fillPercent = window.GAME.teams[1].spinCount;

  // Adjust if bar should be bigger/smaller
  const fullWidth = 300 * 2;
  const fullHeight = 40;

  const barX = width * 0.6;
  const barY = height * 0.1;
  const r = fullHeight / 2;

  const x = barX - fullWidth + 175;
  const y = barY - fullHeight / 2;

  // Draw empty bar (border only)
  noFill();
  stroke(0); // black border
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
  rect(x, y, fullWidth * fillPercent, fullHeight, r);
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

const getScale = (powerupName) =>
  BUBBLE_POWERUP === powerupName ? selectedScaleFactor : scaleFactor;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
};

function drawBackground() {
  background(0);
  image(IMAGES.dustBarrelBackgroundImage, width / 2, height / 2, width, height);
}

function drawScrollPanel() {
  const scrollX = width * 0.78;
  const scrollY = height * 0.45;

  image(
    IMAGES.scrollImage,
    scrollX,
    scrollY,
    IMAGES.scrollImage.width * 0.75,
    IMAGES.scrollImage.height * 0.75
  );

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
    IMAGES.barrelImg,
    barrelX,
    barrelY,
    IMAGES.barrelImg.width * 0.4,
    IMAGES.barrelImg.height * 0.4
  );
}

function drawTable() {
  const tableX = width * 0.5;
  const tableY = height * 0.72;

  // You can adjust the scaling factor as needed
  const scale = 0.9;

  image(
    IMAGES.tableImage,
    tableX,
    tableY,
    IMAGES.tableImage.width * scale,
    IMAGES.tableImage.height * scale
  );
}

function drawCurrentPowerup() {
  const s = getScale(DUST_POWERUP);

  const barrelX = width / 2;
  const barrelY = (width * 6) / 8;

  powerupX = barrelX;
  powerupY = barrelY - IMAGES.barrelImg.height * 0.5;

  image(img, powerupX - 50, powerupY, img.width * s, img.height * s);
}

function drawPowerupInfo() {
  if (!locked || !BUBBLE_POWERUP) return;

  textAlign(CENTER);
  textFont(germania);
  textSize(28);
  fill("white");
}

window.draw = function () {
  if (!window.ASSETS_READY || !window.GAME_READY) {
    background(20);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Loading...", width / 2, height / 2);
    return;
  }

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
  selectStrongAgainst();
  increaseProgress();
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
