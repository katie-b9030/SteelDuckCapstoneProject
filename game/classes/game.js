import { Team } from "./team";
import { Troop } from "./troop";

import { ArduinoController } from "../controllers/ArduinoController.js";

export class Game {
  constructor() {
    this.teams = [
      new Team("Bubble Brigade", this),
      new Team("Dust Dominion", this),
    ];
    this.troops = [];
    this.timeRemaining = 90;

    this.arduinoController = new ArduinoController();
    this.spinThreshold = 5;
    this.bubbleScore = 0;
    this.dustScore = 0;
  }

  update() {
    this.timeRemaining++;

    for (const team of this.teams) team.update();

    for (const troop of this.troops) troop.update();

    this.handleCollisions();
  }

  spawnTroop(teamType, powerup) {
    const troop = new Troop(teamType, powerup);
    this.troops.push(troop);
  }

  // TODO: check for end collison and figure out how to safely remove items
  handleCollisions() {
    for (let i = 0; i < this.troops.length; i++) {
      for (let j = i + 1; j < this.troops.length; j++) {
        const a = this.troops[i];
        const b = this.troops[j];
        if (a.teamType !== b.teamType) {
          a.checkTroopCollision(b);
          if (a.troopCollision && a.collidedWith === b) {
            a.battle(b);
          }
        }
        if (!a.isAlive) {
          // TODO: remove a from troops
          this.troops.splice(a, 1);
        }
        if (!b.isAlive) {
          // TODO: remove b from troops
          this.troops.splice(a, 1);
        }
      }
    }
  }
}
