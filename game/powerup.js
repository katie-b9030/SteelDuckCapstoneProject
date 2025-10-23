export class Powerup {
    constructor(type) {
        this.type;
    }

    types = {
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
    if (this.type === other.type) return 'draw';

    const { beats, losesTo } = Powerup.rules[this.type];

    if (other.type === beats) return 'win';
    if (other.type === losesTo) return 'lose';
   }
}