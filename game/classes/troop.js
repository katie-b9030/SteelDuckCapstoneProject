export class Troop {
  constructor(teamType, powerup) {
    this.teamType = teamType; // bubble brigade or dust dominion
    this.powerup = powerup;

    this.isAlive = true;
    this.speed = 0;

    this.xPos = teamType === "Bubble Brigade" ? 50 : windowWidth - 50; // change based on size of canvas
    this.direction = teamType === "Bubble Brigade" ? 1 : -1;

    this.img = this.chooseImage();
    this.width = teamType === "Bubble Brigade" ? 250 : 150;
    this.height = 350;

    this.troopCollision = false;
    this.collidedWith = null;
    this.endCollision = false;
  }

  chooseImage() {
    if (this.teamType === "Bubble Brigade") {
      if (this.powerup === SHIELD) {
        return bubbleSoldierShieldGif;
      } else if (this.powerup === CHEST) {
        return bubbleSoldierChestplateGif;
      } else if (this.powerup === HELMET) {
        return bubbleSoldierHelmetGif;
      } else {
        return bubbleSoldierPlainGif;
      }
    } else {
      if (this.powerup === SHIELD) {
        return dustSoldierShieldGif;
      } else if (this.powerup === CHEST) {
        return dustSoldierCloakGif;
      } else if (this.powerup === HELMET) {
        return dustSoldierHelmetGif;
      } else {
        return dustSoldierPlainGif;
      }
    }
  }

  // chooseImage() {
  //   if (this.teamType === "Bubble Brigade") {
  //     if (this.powerup === SHIELD) {
  //       return "Bubble Shield";
  //     } else if (this.powerup === CHEST) {
  //       return "Bubble Chest";
  //     } else if (this.powerup === HELMET) {
  //       return "Bubble Helmet";
  //     } else {
  //       return "Bubble";
  //     }
  //   } else {
  //     if (this.powerup === SHIELD) {
  //       return "Dust Shield";
  //     } else if (this.powerup === CHEST) {
  //       return "Dust Chest";
  //     } else if (this.powerup === HELMET) {
  //       return "Dust Helmet";
  //     } else {
  //       return "Dust";
  //     }
  //   }
  // }

  powerup = {
    SHIELD: "shield",
    CHEST: "chest",
    HELMET: "helmet",
  };

  rules = {
    shield: { beats: "helmet", losesTo: "chest" },
    chest: { beats: "shield", losesTo: "helmet" },
    helmet: { beats: "chest", losesTo: "shield" },
  };

  setPowerup(powerup) {
    this.powerup = powerup;
    this.img = this.chooseImage();
  }

  compare(other) {
    if (this.powerup === other.powerup) return "draw";

    const { beats, losesTo } = rules[this.powerup];

    if (other.powerup === beats) return "win";
    if (other.powerup === losesTo) return "lose";
  }

  update() {
    if (!this.isAlive) {
      return;
    }

    this.xPos += this.speed * this.direction;
  }

  battle(other) {
    const result = compare(other.powerup); // need to write compare method in powerup class when created

    if (result === "win") {
      this.troopCollision = true;
      other.die();
    } else if (result === "lose") {
      this.troopCollision = true;
      this.die();
    } else if (result === "end") {
      this.endCollision = true;
      this.die();
    } else {
      this.troopCollision = true;
      this.die();
      other.die();
    }
  }

  die() {
    this.isAlive = false;
  }

  checkTroopCollision(other) {
    if (Math.abs(this.xPos - other.xPos) <= 250) {
      return true;
    }
  }
}
