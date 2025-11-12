"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";
import { preloadImages } from "../game/asset-management/imageAssets.js";

window.SPAWN_ZONE_WIDTH = 100;
const CONTROLLER = new KeyboardController();

function drawLaneAndSpawns() {
  // Actual Lane
  fill("rgba(0, 0, 0, 0.5)");
  rect(0, 500, width, 250);

  //Bubble spawn
  fill("rgba(35, 85, 221, 0.5)");
  rect(0, 500, SPAWN_ZONE_WIDTH, 250);

  //Dust spawn
  fill("rgba(50, 19, 58, 0.5)");
  rect(width - SPAWN_ZONE_WIDTH, 500, SPAWN_ZONE_WIDTH, 250);
}

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  noStroke();
};

window.preload = function () {
  preloadImages();
};

window.draw = function () {
  background(window.IMAGES.backgroundImage);
  drawLaneAndSpawns();

  for (let team of window.GAME.teams) {
    for (let troop of team.troops) {
      push();
      scale(troop.direction, 1);
      image(
        troop.img,
        troop.direction * troop.xPos,
        525,
        troop.width,
        troop.height
      );
    }
  }
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
