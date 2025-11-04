export class Troop {
  constructor(teamType, powerup) {
    this.teamType = teamType; // bubble brigade or dust dominion
    this.powerup = powerup;

    this.isAlive = true;
    this.speed = 0;

    this.lane = "None";
    this.xPos = team === "Bubble Brigade" ? 50 : windowWidth - 50; // change based on size of canvas
    this.yPos = 0; // change based off lane height
    this.direction = team === "Bubble Brigade" ? 1 : -1;

    this.img = this.chooseImage();
    this.width = team === "Bubble Brigade" ? 250 : 150;
    this.height = 350;

    this.troopCollision = false;
    this.collidedWith = null;
    this.endCollision = false;
  }

  chooseImage() {
    if (this.teamType === "Bubble Brigade") {
      if (this.powerup === SHIELD) {
        img = "../../media/assets/characters/bubble_shield.gif";
      } else if (this.powerup === CHEST) {
        img = "../../media/assets/characters/bubble_chestplate.gif";
      } else if (this.powerup === HELMET) {
        img = "../../media/assets/characters/bubble_helmet.gif";
      } else {
        img = "../../media/assets/characters/bubble_empty.gif";
      }
    } else {
      if (this.powerup === SHIELD) {
        img = "../../media/assets/characters/rabbit_shield.gif";
      } else if (this.powerup === CHEST) {
        img = "../../media/assets/characters/rabbit_cloak.gif";
      } else if (this.powerup === HELMET) {
        img = "../../media/assets/characters/rabbit_helmet.gif";
      } else {
        img = "../../media/assets/characters/rabbit_empty.gif";
      }
    }
  }

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
    if (this.troopType === "Bubble Brigade") {
    }
  }
}
