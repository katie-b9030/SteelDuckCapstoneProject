export class Troop {
    constructor(team, lane, powerup) {
        this.team = team    // bubble brigade or dust dominion
        this.lane = lane;
        this.powerup = powerup;

        this.isAlive = true;
        this.health = 100;
        this.speed = 5;

        this.xPos = team === "Bubble Brigade" ? 0 : 100;    // change based on size of canvas
        this.yPos = lane * 100  // change based off lane height
        this.direction = team === "Bubble Brigade" ? 1 : -1;
    }

    update() {
        if(!this.isAlive) {return}

        this.xPos += this.speed * this.direction;

    }

    collidesWith(other) {
        return this.isAlive &&
        other.isAlive &&
        dist(this.xPos, this.yPos, other.xPos, other.yPos) < this.size;
    }

    battle(other) {
        const result = this.powerup.compare(other.powerup);     // need to write compare method in powerup class when created

        if (result === "win") {
            other.die();
        } 
        else if (result === "lose") {
            this.die();
        } 
        else {
            this.die();
            other.die();
        }
    }

    die() {
        this.isAlive = false;
    }
}



