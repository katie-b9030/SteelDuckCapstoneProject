"use strict";

import { preloadLanesImages } from "../game/asset-management/imageAssets.js";
//import { mainGameLoop } from "../game/gameManager.js";

// import { Rive } from "../@rive-app/canvas";

// global consts
const SPAWN_ZONE_WIDTH = 100;
const LANE_HEIGHT = 200;
// const BUBBLE_TROOP_WIDTH = 500;
// const DUST_TROOP_WIDTH = 400;
// const TROOP_HEIGHT = 350;

// const CONTROLLER = new KeyboardController();
// const RIVE = new Rive({
//   src: "https://cdn.rive.app/animations/vehicles.riv",
// });

let barX = 10;
let barY = 10;
let bigBarW;
let barH = 20;
let barW = 1;

let myFont;

let currentDefaultFrame = 0;
let currentDeathFrame = 0;

let lanesBackgroundImage;
let scoreBar;

// images
// let backgroundImage;
// // bubble soldiers
// let bubbleSoldierPlainGif;
// let bubbleSoldierHelmetGif;
// let bubbleSoldierChestplateGif;
// let bubbleSoldierShieldGif;
// // dust soldiers
// let dustSoldierPlainGif;
// let dustSoldierHelmetGif;
// let dustSoldierCloakGif;
// let dustSoldierShieldGif;

// let powerup;

// let bubbleTroops = [];
// let dustTroops = [];

// function mouseInLanes() {
//   return (
//     //(mouseY >= 50 && mouseY <= 250) || // Lane 1
//     mouseY >= windowHeight - 225 && mouseY <= windowHeight - 25 // Lane 2
//     //(mouseY >= 650 && mouseY <= 850) // Lane 3
//   );
// }

function drawUIItems() {
  noStroke();
  // Actual Lane
  fill("rgba(0, 0, 0, 0.5)");
  rect(0, windowHeight - 225, width, LANE_HEIGHT);

  //Bubble spawn
  fill("rgba(35, 85, 221, 0.5)");
  rect(0, windowHeight - 225, SPAWN_ZONE_WIDTH, LANE_HEIGHT);

  //Dust spawn
  fill("rgba(50, 19, 58, 0.5)");
  rect(
    width - SPAWN_ZONE_WIDTH,
    windowHeight - 225,
    SPAWN_ZONE_WIDTH,
    LANE_HEIGHT
  );

  // boxes behind the scores
  stroke(150);        
  strokeWeight(4);
  fill(0);            
  rect(25, 170, 100, 75, 50);
  rect(width - 125, 170, 100, 75, 50);

  fill("#FFFFFF");
  textFont(myFont);
  textSize(24);
  textAlign(CENTER);
  text(window.GAME.timeRemaining, width / 2, 165);

  text("Score:", 75, 200);
  text(window.GAME.teams[0].score, 75, 230);

  text("Score:", width - 75, 200);
  text(window.GAME.teams[1].score, width - 75, 230);
}

window.setup = function () {
  //createCanvas(windowWidth - 20, windowHeight - 20);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.drawingContext.willReadFrequently = true;
  // powerup = sessionStorage.getItem("selectedPowerup") || "None";
  bigBarW = width / 2;
};

// function selectBubbleSoldier() {
//   if (powerup == "Powerup 1") {
//     return bubbleSoldierShieldGif;
//   } else if (powerup == "Powerup 2") {
//     return bubbleSoldierChestplateGif;
//   } else if (powerup == "Powerup 3") {
//     return bubbleSoldierHelmetGif;
//   } else {
//     return bubbleSoldierPlainGif;
//   }
// }

// function selectDustSoldier() {
//   if (powerup == "Powerup 1") {
//     return dustSoldierShieldGif;
//   } else if (powerup == "Powerup 2") {
//     return dustSoldierCloakGif;
//   } else if (powerup == "Powerup 3") {
//     return dustSoldierHelmetGif;
//   } else {
//     return dustSoldierPlainGif;
//   }
// }

// window.mousePressed = function () {
//   // Cannon shot
//   if (mouseInLanes()) {
//     if (mouseX <= SPAWN_ZONE_WIDTH) {
//       let bubble = {
//         x: mouseX - selectBubbleSoldier().width / 2,
//         y: mouseY - selectBubbleSoldier().height / 2,
//         d: random(10, 15),
//         speed: random(0.2, 0.5),
//         dir: 1,
//         color: color("lightblue"),
//         img: selectBubbleSoldier(),
//       };
//       bubbleTroops.push(bubble);
//     } else if (mouseX >= width - SPAWN_ZONE_WIDTH) {
//       let dust = {
//         x: mouseX + selectBubbleSoldier().width / 2,
//         y: mouseY - selectBubbleSoldier().height / 2,
//         d: random(10, 15),
//         speed: random(-0.2, -0.5),
//         dir: -1,
//         color: color("tan"),
//         img: selectDustSoldier(),
//       };
//       dustTroops.push(dust);
//     }
//   }
// };

window.preload = async function () {
  myFont = loadFont("../media/fonts/Germania_One/GermaniaOne-Regular.ttf");
  lanesBackgroundImage = loadImage("../media/assets/backgrounds/bg-zoom-static-blur.png");
  scoreBar = loadImage("../media/assets/ui/score-bar-empty.png");
  await preloadLanesImages();
};

function drawScoreBar() {
  let leftScore = window.GAME.teams[0].score;
  let rightScore = window.GAME.teams[1].score;
  let total = leftScore + rightScore;
  let barWidth = width - 400; // total bar width
  let barHeight = 40;

  let leftFill = total === 0 ? barWidth / 2 : (leftScore / total) * barWidth;
  let rightFill = total === 0 ? barWidth / 2 : (rightScore / total) * barWidth;

  noStroke();

  fill("rgba(35, 85, 221, 1)");
  rect(200, 80, leftFill, barHeight, 60, 0, 0, 60);

  fill("rgba(50, 19, 58, 1)");
  rect(width - 200 - rightFill, 80, rightFill, barHeight, 0, 60, 60, 0);
}


function drawBackground() {
  let imgAspect =
    lanesBackgroundImage.width /
    lanesBackgroundImage.height;
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
    lanesBackgroundImage,
    width / 2,
    height / 2,
    drawWidth,
    drawHeight
  );

  drawScoreBar();

  let sbAspect = scoreBar.height / scoreBar.width;
  let sbW = width;          
  let sbH = sbW * sbAspect; 

  imageMode(CORNER);        
  image(scoreBar, 0, 0, sbW, sbH);

  // image(
  //   window.IMAGES.scoreBar, 
  //   width / 2, 
  //   window.IMAGES.scoreBar.height / 2, 
  //   width, 
  //   width * (window.IMAGES.scoreBar.height / window.IMAGES.scoreBar.width)
  // );
}


function changeCurrentFrame() {
  if (currentDefaultFrame < numDefaultFrames - 1) {
    currentDefaultFrame++;
  } else {
    currentDefaultFrame = 0;
  }
  // if (currentDeathFrame < numDeathFrames - 1) {
  //   currentDeathFrame++;
  // } else {
  //   currentDeathFrame = 0;
  // }
}

window.draw = function () {
  drawBackground();
  drawUIItems();

  if (!window.GAME || !window.GAME.teams) return;
  for (let team of window.GAME.teams) {
    for (let troop of team.troops) {
      if (troop.img[troop.animFrame]) {
        push();
        scale(troop.direction, 1);
        let troopImg = troop.img[troop.animFrame];
        image(
          troopImg,
          troop.direction * troop.xPos,
          windowHeight - 225,
          troop.width,
          troop.height
        );
        pop();
      }
    }
    changeCurrentFrame();
  }

  // noFill();
  // rect(barX, barY, bigBarW, barH);

  // squareMove();

  // barW = constrain(barW, 0, bigBarW);
  // fill("red");
  // rect(barX, barY, barW, barH);

  // for (let b of bubbleTroops) {
  //   b.x += b.speed * b.d;
  //   image(b.img, b.x, windowHeight - 225, b.width, b.height);
  // }

  // for (let d of dustTroops) {
  //   d.x += d.speed * d.d;
  //   push();
  //   scale(-1, 1);
  //   image(d.img, -d.x, windowHeight - 225, d.width, d.height);
  //   pop();
  // }

  // changeCurrentFrame();
};

window.windowResized = function () {
  // RIVE.resizeDrawingSurfaceToCanvas();
  resizeCanvas(windowWidth, windowHeight);
  bigBarW = width / 2;
};
