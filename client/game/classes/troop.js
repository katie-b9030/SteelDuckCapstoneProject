export class Troop {
  static POWERUP = {
    SHIELD: "shield",
    CHEST: "chest",
    HELMET: "helmet",
  };

  static rules = {
    shield: { beats: "helmet", losesTo: "chest" },
    chest: { beats: "shield", losesTo: "helmet" },
    helmet: { beats: "chest", losesTo: "shield" },
  };

  constructor(teamType, powerup) {
    this.teamType = teamType; // bubble brigade or dust dominion
    this.powerup = powerup;

    this.isAlive = true;
    this.speed = this.chooseSpeed();

    this.img = this.chooseImage();
    this.width = 125;
    this.height = 200;

    this.xPos = teamType === "Bubble Brigade" ? 0 : windowWidth; // change based on size of canvas
    this.direction = teamType === "Bubble Brigade" ? 1 : -1;

    this.troopCollision = false;
    this.collidedWith = null;
    this.endCollision = false;
  }

  chooseImage() {
    if (this.teamType === "Bubble Brigade") {
      if (this.powerup === Troop.POWERUP.SHIELD) {
        return window.IMAGES.bubbleSoldierShieldGif;
      } else if (this.powerup === Troop.POWERUP.CHEST) {
        return window.IMAGES.bubbleSoldierChestplateGif;
      } else if (this.powerup === Troop.POWERUP.HELMET) {
        return window.IMAGES.bubbleSoldierHelmetGif;
      } else {
        return window.IMAGES.bubbleSoldierPlainGif;
      }
    } else {
      if (this.powerup === Troop.POWERUP.SHIELD) {
        return window.IMAGES.dustSoldierShieldGif;
      } else if (this.powerup === Troop.POWERUP.CHEST) {
        return window.IMAGES.dustSoldierCloakGif;
      } else if (this.powerup === Troop.POWERUP.HELMET) {
        return window.IMAGES.dustSoldierHelmetGif;
      } else {
        return window.IMAGES.dustSoldierPlainGif;
      }
    }
  }

  chooseSpeed() {
    if (this.powerup === Troop.POWERUP.SHIELD) {
      return 1;
    } else if (this.powerup === Troop.POWERUP.CHEST) {
      return 0.75;
    } else if (this.powerup === Troop.POWERUP.HELMET) {
      return 1.25;
    } else {
      return 1;
    }
  }

  setPowerup(powerup) {
    this.powerup = powerup;
    this.img = this.chooseImage();
    this.speed = this.chooseSpeed();
  }

  compare(other) {
    if (other.powerup === null) return "end";
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
    } else if (result === "end") {
      this.die();
    } else {
      this.die();
      other.die();
    }
  }

  die() {
    this.isAlive = false;
  }

  checkTroopCollision(other) {
    if (Math.abs(this.xPos - other.xPos) <= 250) {
      this.troopCollision = true;
      other.troopCollision = true;
      this.collidedWith = other;
      other.collidedWith = this;
      return true;
    }
  }

  checkEndCollision() {
    if (this.troopType === "Bubble Brigade" && this.xPos >= windowWidth - 100) {
      this.endCollision = true;
      return true;
    } else if (this.troopType === "Dust Dominion" && this.xPos <= 100) {
      this.endCollision = true;
      return true;
    }
  }
}
