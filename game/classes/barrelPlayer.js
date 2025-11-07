//TODO: add way to select powerup
//TODO: add way to handle spin sequence (track if spins have been completed)

export class BarrelPlayer {
  constructor(teamType, game) {
    this.game = game;
    this.team = teamType;
    this.state = IDLE;
    this.spinSequence = [];
    this.selectedPowerup = 1;
  }

  States = {
    IDLE: "idle",
    SELECTING_POWERUP: "powerup selection",
    WASHING: "washing",
    COMPLETE: "task complete",
  };

  SpinDirections = {
    CLOCKWISE: "clockwise",
    COUNTER_CLOCKWISE: "counter-clockwise",
  };

  Powerups = {
    1: 1,
    2: 2,
    3: 3,
  };

  createSpinSequence() {
    this.spinSequence = [];

    const numSpins = Math.floor(Math.random() * 3) + 4; //choose a random number of spins between 4-6
    const totalTime = 10;
    let remainingTime = totalTime;

    for (let i = 0; i < numSpins; i++) {
      const direction =
        Math.random() > 0.5 // choose random direction
          ? this.SpinDirections.CLOCKWISE
          : this.SpinDirections.COUNTER_CLOCKWISE;

      //
      let duration;
      if (i === numSpins - 1) {
        duration = remainingTime; // if it's the last spin give the rest of the time
      } else {
        const maxDuration = remainingTime - (numSpins - i - 1); // leave at least 1 second for each spin
        duration = +(Math.random() * (maxDuration - 1) + 1).toFixed(2);
      }

      remainingTime -= duration;

      this.spinSequence.push({ direction, duration });
    }
  }
}
