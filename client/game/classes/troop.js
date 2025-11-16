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

    this.xPos = teamType === "Bubble Brigade" ? 0 : width; // change based on size of canvas
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
    if (other === null) return "end";
    if (this.powerup === other.powerup) return "draw";

    const { beats, losesTo } = Troop.rules[this.powerup];

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
    const result = this.compare(other); // need to write compare method in powerup class when created

    if (result === "win") {
      other.die();
      return this;
    } else if (result === "lose") {
      this.die();
      return other;
    } else if (result === "end") {
      this.die();
      return this;
    } else {
      this.die();
      other.die();
      return null;
    }
  }

  die() {
    this.isAlive = false;
  }

  checkTroopCollision(other) {
    if (Math.abs(this.xPos - other.xPos) <= this.width) {
      this.troopCollision = true;
      other.troopCollision = true;
      this.collidedWith = other;
      other.collidedWith = this;
      return true;
    }
  }

  checkEndCollision() {
    if (this.teamType === "Bubble Brigade" && this.xPos >= width - 125) {
      this.endCollision = true;
      return this.battle(null);
    } else if (this.teamType === "Dust Dominion" && this.xPos <= 225) {
      this.endCollision = true;
      return this.battle(null);
    }
  }
}
