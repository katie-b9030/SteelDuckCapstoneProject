"use strict";

import { KeyboardController } from "../controllers/KeyboardController.js";

window.SPAWN_ZONE_WIDTH = 100;
const CONTROLLER = new KeyboardController();

// images
let backgroundImage;
// bubble soldiers
window.bubbleSoldierPlainGif;
window.bubbleSoldierHelmetGif;
window.bubbleSoldierChestplateGif;
window.bubbleSoldierShieldGif;
// dust soldiers
window.dustSoldierPlainGif;
window.dustSoldierHelmetGif;
window.dustSoldierCloakGif;
window.dustSoldierShieldGif;

function drawLaneAndSpawns() {
  // Actual Lane
  fill("rgba(0, 0, 0, 0.5)");
  rect(0, 500, width, 200);

  //Bubble spawn
  fill("rgba(35, 85, 221, 0.5)");
  rect(0, 500, SPAWN_ZONE_WIDTH, 200);

  //Dust spawn
  fill("rgba(50, 19, 58, 0.5)");
  rect(width - SPAWN_ZONE_WIDTH, 500, SPAWN_ZONE_WIDTH, 200);
}

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  noStroke();
};

window.preload = function () {
  backgroundImage = loadImage(
    "../media/assets/background/modeled-background-no-color.png"
  );

  bubbleSoldierPlainGif = loadImage(
    "../media/assets/characters/bubble-empty.gif"
  );
  bubbleSoldierHelmetGif = loadImage(
    "../media/assets/characters/bubble-helmet.gif"
  );
  bubbleSoldierChestplateGif = loadImage(
    "../media/assets/characters/bubble-chestplate.gif"
  );
  bubbleSoldierShieldGif = loadImage(
    "../media/assets/characters/bubble-shield.gif"
  );

  dustSoldierPlainGif = loadImage("../media/assets/characters/dust-empty.gif");
  dustSoldierHelmetGif = loadImage(
    "../media/assets/characters/dust-helmet.gif"
  );
  dustSoldierCloakGif = loadImage("../media/assets/characters/dust-cloak.gif");
  dustSoldierShieldGif = loadImage(
    "../media/assets/characters/dust-shield.gif"
  );
};

window.draw = function () {
  background(backgroundImage);
  drawLaneAndSpawns();

  for (let team of GAME.teams) {
    for (let troop of team.troops) {
      image(troop.image, troop.xPos, 600, troop.width, troop.height);
    }
  }
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
