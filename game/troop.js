export class Troop {
    constructor(teamType, lane, powerup) {
        this.teamType = teamType    // bubble brigade or dust dominion
        this.lane = lane;
        this.powerup = powerup;

        this.isAlive = true;
        this.speed = 5;

        this.xPos = team === "Bubble Brigade" ? 0 : 100;    // change based on size of canvas
        this.yPos = lane * 100  // change based off lane height
        this.direction = team === "Bubble Brigade" ? 1 : -1;
    }

    powerup = {
        ROCK: 'rock',
        PAPER: 'paper',
        SCISSORS: 'scissors'
    }

    rules = {
        rock: { beats: 'scissors', losesTo: 'paper' },
        paper: { beats: 'rock', losesTo: 'scissors' },
        scissors: { beats: 'paper', losesTo: 'rock' }
    }
    
    compare(other) {
    if (this.powerup === other.powerup) return 'draw';

    const { beats, losesTo } = rules[this.powerup];

    if (other.powerup === beats) return 'win';
    if (other.powerup === losesTo) return 'lose';
   }

    update() {
        if(!this.isAlive) {return}

        this.xPos += this.speed * this.direction;
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



