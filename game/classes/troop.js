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
        return bubble_solider_shield_gif;
      } else if (this.powerup === CHEST) {
        return bubble_solider_chestplate_gif;
      } else if (this.powerup === HELMET) {
        return bubble_solider_helmet_gif;
      } else {
        return bubble_solider_plain_gif;
      }
    } else {
      if (this.powerup === SHIELD) {
        return dust_solider_shield_gif;
      } else if (this.powerup === CHEST) {
        return dust_solider_cloak_gif;
      } else if (this.powerup === HELMET) {
        return dust_solider_helmet_gif;
      } else {
        return dust_solider_plain_gif;
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
  //       return "Rabbit Shield";
  //     } else if (this.powerup === CHEST) {
  //       return "Rabbit Chest";
  //     } else if (this.powerup === HELMET) {
  //       return "Rabbit Helmet";
  //     } else {
  //       return "Rabbit";
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
      other.die();
    } else if (result === "lose") {
      this.die();
    } else {
      this.die();
      other.die();
    }
  }

  die() {
    this.isAlive = false;
  }

  checkCollision(other) {
    if (Math.abs(this.xPos - other.xPos) <= 250) {
      this.battle(other);
    }
  }
}
