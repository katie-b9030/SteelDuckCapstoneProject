"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";

const CONTROLLER = new KeyboardController();

const SPIN_THRESHOLD = 10;

let bgImage;
let tableImage;
let scrollImage;
let progressBar;
let barrelImg;
let bubbleChestplate;
let bubbleHelmet;
let bubbleShield;

let strongAgainst = "";

let spinCount = 0;
let powerup;
let fillPercent = 0;

let germania;

let powerupX, powerupY;

let selectedPowerup = "bubbleShield"; // 'bubbleShield', 'bubbleChestplate', 'bubbleHelmet'
let locked = false;
let scaleFactor = 0.5;
let selectedScaleFactor = 0.8;

window.preload = function () {
  progressBar = loadImage("../media/assets/ui/new-bubble-bar.png");
  bgImage = loadImage("../media/assets/backgrounds/layout-clean.png");
  scrollImage = loadImage("../media/assets/ui/scroll.png");
  tableImage = loadImage("../media/assets/ui/table.png");
  barrelImg = loadImage("../media/assets/ui/barrel.png");
  bubbleChestplate = loadImage("../media/assets/armor/bubble-chestplate.png");
  bubbleHelmet = loadImage("../media/assets/armor/bubble-helmet.png");
  bubbleShield = loadImage("../media/assets/armor/bubble-shield.png");
  germania = loadFont("../media/fonts/Germania_One/GermaniaOne-Regular.ttf");
};

function drawBubbleFillBar() {
  // Adjust if bar should be bigger/smaller
  const fullWidth = 300 * 2;
  const fullHeight = 40;

  const barX = width * 0.6;
  const barY = height * 0.1;
  const r = fullHeight / 2;

  const x = barX - fullWidth + 175;
  const y = barY - fullHeight / 2;

  // push();
  // translate(barX - fullWidth / 2, barY - fullHeight / 2);

  // Draw empty bar (border only)
  noFill();
  stroke(0);
  strokeWeight(3); // black border
  rect(x, y, fullWidth, fullHeight, r);
  //rect(-200, -100, barX - fullWidth / 2, barY - fullHeight / 2, 200); // optional corner radius 10

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(x, y, fullWidth, fullHeight, r);
  drawingContext.clip();

  // Draw filled portion
  noStroke();
  fill(98, 202, 235); // your blue color
  rect(x, y, fullWidth * fillPercent, fullHeight, r);
  //rect(-200, -100, (barX - fullWidth / 2) * fillPercent, barY - fullHeight / 2, 200);

  drawingContext.restore();
  //pop();

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

  spinCount = CONTROLLER.getBarrelSpins(); // SPACE increments this

  // Convert spins → percent
  fillPercent = Math.min(spinCount / SPIN_THRESHOLD, 1);

  if (fillPercent >= 1 && !window.transitioning) {
    window.transitioning = true;

    setTimeout(() => {
      sessionStorage.setItem("fromBarrelScreen", "true");
      sessionStorage.setItem("selectedSet", "bubble");
      window.location.href = "lanes-screen.html";
    }, 1000);
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

    if (selectedPowerup === "bubbleShield") {
      strongAgainst = "Helmet";
    } else if (selectedPowerup === "bubbleChestplate") {
      strongAgainst = "Shield";
    } else if (selectedPowerup === "bubbleHelmet") {
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

  image(
    scrollImage,
    scrollX,
    scrollY,
    scrollImage.width * 0.75,
    scrollImage.height * 0.75
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
    barrelImg,
    barrelX,
    barrelY,
    barrelImg.width * 0.4,
    barrelImg.height * 0.4
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

  if (selectedPowerup === "bubbleShield") img = bubbleShield;
  else if (selectedPowerup === "bubbleChestplate") img = bubbleChestplate;
  else if (selectedPowerup === "bubbleHelmet") img = bubbleHelmet;

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
  drawBubbleFillBar();
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
