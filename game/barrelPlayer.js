import { Player } from "./player";

export class BarrelPlayer extends Player {
    constructor(teamType, game){
        this.game = game;
        this.team = teamType;
        this.state = IDLE;
        this.spinDirection = CLOCKWISE;
        this.speed = 0;
    }

    States = {
        IDLE: "idle",
        SELECTING_POWERUP: "powerup selection",
        WASHING: "washing",
        COMPLETE: "task complete"
    }

    SpinDirections = {
        CLOCKWISE: "clockwise",
        COUNTER_CLOCKWISE: "counter-clockwise"
    }

    spinSequence = [];

    createSpinSequence() {
        // choose a random number between 4-6 (# of spins)
        // split up 10 seconds randomly among the number of spins
        // choose a random spin direction for each spin
        // create key/value for each spin (?)
        // add each pair to arrayx
    }
}

