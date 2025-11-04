import { Team } from "./team";
import { Troop } from "../troop";

class Game {
  constructor() {
    this.teams = [
      new Team("Bubble Brigade", this),
      new Team("Dust Dominion", this),
    ];
    this.troops = [];
    this.time = 0;
  }

  update() {
    this.time++;

    for (const team of this.teams) team.update();

    for (const troop of this.troops) troop.update();

    this.handleCollisions();
  }

  spawnTroop(teamType, powerup, lane) {
    const troop = new Troop(teamType, powerup, lane);
    this.troops.push(troop);
  }

  handleCollisions() {
    for (let i = 0; i < this.troops.length; i++) {
      for (let j = i + 1; j < this.troops.length; j++) {
        const a = this.troops[i];
        const b = this.troops[j];
        if (
          a.teamType !== b.teamType &&
          a.lane === b.lane &&
          a.isAlive &&
          b.isAlive
        ) {
          a.battle(b);
        }
      }
    }
  }
}
