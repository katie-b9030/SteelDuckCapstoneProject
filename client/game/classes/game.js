import { Team } from "./team.js";

export class Game {
  constructor() {
    this.teams = [
      new Team("Bubble Brigade", this),
      new Team("Dust Dominion", this),
    ];

    this.state = Game.STATES.MENU;

    this.timeRemaining = 120;

    this.startTime = null;

    this.elapsed = 0;

    this.spinThreshold = 10;

    this.winner = null;
  }

  static STATES = {
    MENU: "menu",
    ONGOING: "ongoing",
    GAMEOVER: "gameover",
  };

  update() {
    this.elapsed = (millis() - this.startTime) / 1000;

    this.timeRemaining = Math.max(120 - Math.floor(this.elapsed), 0);

    this.handleCollisions();

    for (const TEAM of this.teams) TEAM.update();
  }

  // TODO: check for end collison and figure out how to safely remove items
  handleCollisions() {
    for (let i = 0; i < this.teams[0].troops.length; i++) {
      for (let j = 0; j < this.teams[1].troops.length; j++) {
        const b = this.teams[0].troops[i];
        const d = this.teams[1].troops[j];
        if (b.teamType !== d.teamType && b.isAlive && d.isAlive) {
          if (b.checkTroopCollision(d)) {
            this.teams[0].checkForScore(b.battle(d), 1);
            this.teams[1].checkForScore(b.battle(d), 1);
          }
        }
      }
    }
    for (let b of this.teams[0].troops) {
      if (b.isAlive) {
        this.teams[0].checkForScore(b.checkEndCollision(), 5);
      }
    }
    for (let d of this.teams[1].troops) {
      if (d.isAlive) {
        this.teams[1].checkForScore(d.checkEndCollision(), 5);
      }
    }
  }

  startGame() {
    // TODO: Show Start screen
    this.startTime = millis();
    this.elapsed = 0;
  }

  endGame() {
    if (this.teams[0].score > this.teams[1].score) {
      // Bubble wins
    } else if (this.teams[0].score < this.teams[1].score) {
      // Dust wins
    } else {
      // They tie
    }

    // TODO: Show End Screen
  }

  getNextState() {
    if (this.state === Game.STATES.MENU) {
      this.state = Game.STATES.ONGOING;
    } else if (this.state === Game.STATES.ONGOING) {
      this.state = Game.STATES.GAMEOVER;
    } else {
      this.state = Game.STATES.MENU;
    }
  }
}
