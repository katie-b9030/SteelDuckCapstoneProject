import { Team } from "./team";

export class Game {
  constructor() {
    this.teams = [
      new Team("Bubble Brigade", this),
      new Team("Dust Dominion", this),
    ];
    this.timeRemaining = 90;

    this.spinThreshold = 5;
  }

  update() {
    this.timeRemaining++;

    for (const TEAM of this.teams) TEAM.update();

    this.handleCollisions();
  }

  // TODO: check for end collison and figure out how to safely remove items
  handleCollisions() {
    for (let i = 0; i < this.teams[0].length; i++) {
      for (let j = i + 1; j < this.teams[1].length; j++) {
        const b = this.teams[0].troops[i];
        const d = this.teams[1].troops[j];
        if (b.teamType !== d.teamType) {
          if (b.checkTroopCollision(d)) {
            b.battle(d);
          }
        }
      }
    }
  }

  endGame() {}

  startGame() {}

  modifyTroop(troop, newPowerup) {
    troop.setPowerup(newPowerup);
  }

  troopCreationProgress(barrelSpins) {}
}
