import { CannonPlayer } from "../players/cannonPlayer";
import { BarrelPlayer } from "../players/barrelPlayer";
import { Troop } from "./troop";

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
    this.barrel.update();
    this.cannon.update();
  }

  spawnTroop(powerup) {
    const TROOP = new Troop("Bubble Brigade", powerup);
    this.troops.push(TROOP);
  }
}
