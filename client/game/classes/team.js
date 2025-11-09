import { CannonPlayer } from "./cannonPlayer.js";
import { BarrelPlayer } from "./barrelPlayer.js";
import { Troop } from "./troop.js";

export class Team {
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.score = 0;
    this.troops = [];

    this.barrel = new BarrelPlayer(name, game);
    this.cannon = new CannonPlayer(name, game);
  }

  update() {
    // this.barrel.update();
    // this.cannon.update();

    this.checkForScore();
    this.filterDeaths();

    for (const TROOP of this.troops) TROOP.update();
  }

  spawnTroop(powerup) {
    const TROOP = new Troop(this.name, powerup);
    this.troops.push(TROOP);
  }

  checkForScore() {
    for (let troop of this.troops) {
      if (troop.troopCollision && troop.isAlive) {
        this.score += 1;
      } else if (troop.endCollision) {
        this.score += 5;
      }

      troop.troopCollision = false;
      troop.collidedWith = false;
      troop.endCollision = false;
    }
  }

  filterDeaths() {
    let currentLiveTroops = this.troops.filter((troop) => troop.isAlive);

    this.troops = currentLiveTroops;
  }

  modifyTroop(troop, newPowerup) {
    troop.setPowerup(newPowerup);
  }
}
