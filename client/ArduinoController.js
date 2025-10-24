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

    update() { }

    getBarrelDirection() {
        return this.barrelData.barrelDirection;
    }

    getBarrelPowerUp() {
        return this.barrelData.barrelPowerUp;
    }

    getBarrelPressed() {
        return this.barrelData.barrelPressed;
    }

    getBarrelPowerupPressed() {
        return this.barrelData.barrelPowerup;
    }
}

