import { Team } from "./team";

export class Game {
  constructor() {
    this.teams = [
      new Team("Bubble Brigade", this),
      new Team("Dust Dominion", this),
    ];
    this.timeRemaining = 90;

    this.spinThreshold = 5;

    this.winner = null;

    this.gameState = this.STATES.MENU;
  }

  STATES = {
    MENU: "menu",
    ONGOING: "ongoing",
    GAMEOVER: "gameover",
  };

  update() {
    this.timeRemaining -= deltaTime / 1000;

    for (const TEAM of this.teams) TEAM.update();

    this.handleCollisions();

    if(this.timeRemaining < 0) {
      this.timeRemaining = 0;
      this.endGame();
    }
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

  startGame() {
    // TODO: Show Start screen
    this.gameState = this.STATES.ONGOING;
  }

  endGame() {
    this.gameState = this.STATES.GAMEOVER;

    if (this.teams[0].score > this.teams[1].score) {
      // Bubble wins
    } else if (this.teams[0].score < this.teams[1].score) {
      // Dust wins
    } else {
      // They tie
    }

    // TODO: Show End Screen
  }

  troopCreationProgress(barrelSpins) {
    // create troops
  }
}
