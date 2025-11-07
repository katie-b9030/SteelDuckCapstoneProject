const socket = io();

export class ArduinoController {
  constructor() {
    this.barrelData = {};
    this.cannonData = {};

    socket.on("barrelData", (data) => {
      this.barrelData = data;
    });

    socket.on("cannonData", (data) => {
      this.cannonData = data;
    });
  }

  update() {}

  getBarrelSpins() {
    return this.barrelData.barrelSpins;
  }

  getBarrelPowerup() {
    return this.barrelData.barrelPowerup;
  }

  getBarrelPowerupPressed() {
    return this.barrelData.barrelPowerupPressed;
  }
}
