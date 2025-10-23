//TODO: add way to track if reload sequence steps have been completed (including pressing button)


export class CannonPlayer {
    constructor(teamType, game){
        this.game = game;
        this.team = teamType;
        this.state = IDLE;
        this.reloadSequence = [];
    }

    States = {
        IDLE: "idle",
        SELECTING_POWERUP: "powerup selection",
        WASHING: "washing",
        COMPLETE: "task complete"
    }

    createReloadSequence() {
        this.reloadSequence = [];

        const numSpins = Math.floor(Math.random() * 3) + 7; // randomly choose between 7-9 steps

        for (let i = 0; i < numSpins; i++) {
            const direction = Math.random() > 0.5 
                ? "clockwise" 
                : "counter-clockwise";

            this.reloadSequence.push({
                direction,
            });
        }
    }
}