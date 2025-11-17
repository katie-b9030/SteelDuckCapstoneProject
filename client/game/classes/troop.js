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

  static STATES = {
    ALIVE: "alive",
    ATTACKING: "attacking",
    DAMAGED: "damaged",
    DYING: "dying",
    DEAD: "dead",
  };

  constructor(teamType, powerup) {
    this.teamType = teamType; // bubble brigade or dust dominion
    this.powerup = powerup;

    this.state = Troop.STATES.ALIVE;
    this.isAlive = true;
    this.speed = this.chooseSpeed();

    this.img = this.chooseImage();
    this.width = 200;
    this.height = 200;

    this.xPos = teamType === "Bubble Brigade" ? 0 : width; // change based on size of canvas
    this.direction = teamType === "Bubble Brigade" ? 1 : -1;

    this.animFrame = 0;
    this.animFinished = false;

    this.troopCollision = false;
    this.collidedWith = null;
    this.endCollision = false;
  }

  chooseImage() {
    if (this.teamType === "Bubble Brigade") {
      if (this.state === Troop.STATES.ALIVE) {
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.bubbleSoldierShieldWalkFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.bubbleSoldierChestWalkFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.bubbleSoldierHelmetWalkFrames;
        } else {
          return window.IMAGES.bubbleSoldierDefaultWalkFrames;
        }
      } else if (this.state === Troop.STATES.ATTACKING) {
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.bubbleSoldierShieldAttackFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.bubbleSoldierChestAttackFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.bubbleSoldierHelmetAttackFrames;
        } else {
          return window.IMAGES.bubbleSoldierDefaultAttackFrames;
        }
      } else if (this.state === Troop.STATES.DAMAGED) {
        this.width = 275;
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.bubbleSoldierShieldDamagedFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.bubbleSoldierChestDamagedFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.bubbleSoldierHelmetDamagedFrames;
        } else {
          return window.IMAGES.bubbleSoldierDefaultDamagedFrames;
        }
      } else if (this.state === Troop.STATES.DYING) {
        this.width = 275;
        return window.IMAGES.bubbleSoldierDeathFrames;
      } else {
        return [];
      }
    } else if (this.teamType === "Dust Dominion") {
      if (this.state === Troop.STATES.ALIVE) {
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.dustSoldierShieldWalkFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.dustSoldierChestWalkFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.dustSoldierHelmetWalkFrames;
        } else {
          return window.IMAGES.dustSoldierDefaultWalkFrames;
        }
      } else if (this.state === Troop.STATES.ATTACKING) {
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.dustSoldierShieldAttackFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.dustSoldierChestAttackFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.dustSoldierHelmetAttackFrames;
        } else {
          return window.IMAGES.dustSoldierDefaultAttackFrames;
        }
      } else if (this.state === Troop.STATES.DAMAGED) {
        this.width = 275;
        if (this.powerup === Troop.POWERUP.SHIELD) {
          return window.IMAGES.dustSoldierShieldDamagedFrames;
        } else if (this.powerup === Troop.POWERUP.CHEST) {
          return window.IMAGES.dustSoldierChestDamagedFrames;
        } else if (this.powerup === Troop.POWERUP.HELMET) {
          return window.IMAGES.dustSoldierHelmetDamagedFrames;
        } else {
          return window.IMAGES.dustSoldierDefaultDamagedFrames;
        }
      } else if (this.state === Troop.STATES.DYING) {
        this.width = 275;
        return window.IMAGES.dustSoldierDeathFrames;
      } else {
        return [];
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

  setState(state) {
    this.state = state;
    this.animFrame = 0;
    this.animFinished = false;
    this.img = this.chooseImage();
  }

  compare(other) {
    if (other === null) return "end";
    if (this.powerup === other.powerup) return "draw";

    const { beats, losesTo } = Troop.rules[this.powerup];

    if (other.powerup === beats) return "win";
    if (other.powerup === losesTo) return "lose";
  }

  update() {
    if (this.state === Troop.STATES.DEAD) {
      return;
    }

    if (this.state !== Troop.STATES.ALIVE) {
      if (this.animFrame < this.img.length - 1) {
        this.animFrame++;
      } else {
        this.animFinished = true;
        if (this.isAlive) {
          this.setState(Troop.STATES.ALIVE);
        } else {
          if (this.state === Troop.STATES.ATTACKING) {
            this.setState(Troop.STATES.DAMAGED);
          } else if (this.state === Troop.STATES.DAMAGED) {
            this.setState(Troop.STATES.DYING);
          } else if (this.state === Troop.STATES.DYING) {
            this.setState(Troop.STATES.DEAD);
          }
        }
      }
    } else {
      this.xPos += this.speed * this.direction;
      if (this.animFrame < this.img.length - 1) {
        this.animFrame++;
      } else {
        this.animFrame = 0;
      }
    }
  }

  battle(other) {
    const result = this.compare(other); // need to write compare method in powerup class when created

    if (result === "win") {
      this.setState(Troop.STATES.ATTACKING);
      other.setState(Troop.STATES.DAMAGED);
      other.die();
      return this;
    } else if (result === "lose") {
      this.setState(Troop.STATES.DAMAGED);
      other.setState(Troop.STATES.ATTACKING);
      this.die();
      return other;
    } else if (result === "end") {
      this.setState(Troop.STATES.DEAD);
      this.die();
      return this;
    } else {
      this.setState(Troop.STATES.ATTACKING);
      other.setState(Troop.STATES.ATTACKING);
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
