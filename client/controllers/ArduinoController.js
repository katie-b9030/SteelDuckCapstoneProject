const socket = io();

export class ArduinoController {
  constructor() {
    this.bubbleData = {};
    this.dustData = {};

    socket.on("bubbleData", (data) => {
      this.bubbleData = data;
    });

    socket.on("dustData", (data) => {
      this.dustData = data;
    });
  }

  update() {}

  getBubbleState() {
    return this.bubbleData.bubbleState;
  }

  getBubbleSpins() {
    return this.bubbleData.bubbleSpins;
  }

  getBubblePowerup() {
    return this.bubbleData.bubblePowerup;
  }

  getBubblePressed() {
    return this.bubbleData.bubblePressed;
  }

  getDustState() {
    return this.dustData.dustState;
  }

  getDustSpins() {
    return this.dustData.dustSpins;
  }

  getDustPowerup() {
    return this.dustData.dustPowerup;
  }

  getDustPressed() {
    return this.dustData.dustPressed;
  }
}
