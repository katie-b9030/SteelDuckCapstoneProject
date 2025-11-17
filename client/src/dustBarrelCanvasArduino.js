"use strict";
import { preloadLanesImages } from "../game/asset-management/imageAssets.js";
import { Troop } from "../game/classes/troop.js";

window.ASSETS_READY = false;

let strongAgainst = "";
let fillPercent;

let germania;

let powerupX, powerupY;

let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

let currentPowerupFrame = 0;
let currentBarrelFrame = 0;

window.preload = function () {
  preloadLanesImages().then(() => {
    window.ASSETS_READY = true;
  });

  germania = loadFont("../media/fonts/Germania_One/GermaniaOne-Regular.ttf");
};

function setStrongAgainst() {
  if (DUST_POWERUP === Troop.POWERUP.SHIELD) {
    strongAgainst = Troop.POWERUP.HELMET;
  } else if (DUST_POWERUP === Troop.POWERUP.CHEST) {
    strongAgainst = Troop.POWERUP.SHIELD;
  } else if (DUST_POWERUP === Troop.POWERUP.HELMET) {
    strongAgainst = Troop.POWERUP.CHEST;
  }
}

function changeCurrentFrame() {
  if (currentPowerupFrame < numDefaultFrames - 1) {
    currentPowerupFrame++;
  } else {
    currentPowerupFrame = 0;
  }

  if (currentBarrelFrame < numDeathFrames - 1) {
    currentBarrelFrame++;
  } else {
    currentBarrelFrame = 0;
  }
}

function drawDustFillBar() {
  fillPercent = window.GAME.teams[1].spinCount;

  // Adjust if bar should be bigger/smaller
  const fullWidth = 300 * 2;
  const fullHeight = 40;

  const barX =windowWidth * 0.6;
  const barY =windowHeight * 0.1;
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
  DUST_POWERUP === powerupName ? selectedScaleFactor : scaleFactor;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  if (!window.p5SetupDone) {
    window.p5SetupDone = true;
  }
};

function drawBackground() {
  background(0);
  image(IMAGES.dustBarrelBackgroundImage,windowWidth / 2,windowHeight / 2,windowWidth,windowHeight);
}

function drawScrollPanel() {
  setStrongAgainst();

  const scrollX =windowWidth * 0.78;
  const scrollY =windowHeight * 0.45;

  let img;

  image(
    IMAGES.scrollImage,
    scrollX,
    scrollY,
    IMAGES.scrollImage.width * 0.75,
    IMAGES.scrollImage.height * 0.75
  );

  textAlign(CENTER);
  fill(80);
  noStroke();
  textSize(34);
  textFont(germania);
  text(`beats`, scrollX, scrollY - IMAGES.scrollImage.height * 0.1);

  // fill("#964B00");
  // textSize(48);
  // text(strongAgainst, scrollX, scrollY + IMAGES.scrollImage.height * 0.02);

  if (strongAgainst === Troop.POWERUP.SHIELD)
    img = IMAGES.bubbleShieldFrames[currentPowerupFrame];
  else if (strongAgainst === Troop.POWERUP.CHEST)
    img = IMAGES.bubbleShieldFrames[currentPowerupFrame];
  else if (strongAgainst === Troop.POWERUP.HELMET)
    img = IMAGES.bubbleShieldFrames[currentPowerupFrame];

  image(img, scrollX, scrollY + 50, 150, 150);
}

function drawBarrel() {
  const barrelX =windowWidth / 2;
  const barrelY = (height * 6) / 8;

  let barrelFrame = IMAGES.barrel[currentBarrelFrame];
  image(barrelFrame, barrelX, barrelY, 600 * 0.4, 400 * 0.4);
}

function drawTable() {
  const tableX =windowWidth * 0.5;
  const tableY =windowHeight * 0.72;

  // You can adjust the scaling factor as needed
  const scale = 0.9;

  image(IMAGES.tableImage, tableX, tableY, 600 * scale, 500 * scale);
}

function drawCurrentPowerup() {
  const s = getScale(DUST_POWERUP);
  let img;

  const barrelX =windowWidth / 2;
  const barrelY = (height * 6) / 8;

  powerupX = barrelX;
  powerupY = barrelY - 400 * 0.5;

  if (DUST_POWERUP === Troop.POWERUP.SHIELD)
    img = IMAGES.dustShieldFrames[currentPowerupFrame];
  else if (DUST_POWERUP === Troop.POWERUP.CHEST)
    img = IMAGES.dustChestFrames[currentPowerupFrame];
  else if (DUST_POWERUP === Troop.POWERUP.HELMET)
    img = IMAGES.dustHelmetFrames[currentPowerupFrame];

  image(img, powerupX - 50, powerupY, 300 * s, 300 * s);
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
    text("Loading...",windowWidth / 2,windowHeight / 2);
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
  changeCurrentFrame();
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
