import { CannonPlayer } from "../players/cannonPlayer";
import { BarrelPlayer } from "../players/barrelPlayer";

export class Team {
  constructor(name, game) {
    this.name = name;
    this.game = game;

    this.barrel = new BarrelPlayer(name, game);
    this.cannon = new CannonPlayer(name, game);
  }

  update() {
    this.barrel.update();
    this.cannon.update();
  }
}
