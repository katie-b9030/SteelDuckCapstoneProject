export class BarrelKeyboardController {
  update() {}

  spinCount = 0;
  selectedPowerup = "None";

  getBarrelDirection() {
    if (keyIsDown(32)) this.spinCount++; //space
    return this.spinCount;
  }

  getBarrelPowerup() {
    if (keyIsDown(49)) this.selectedPowerup = "Powerup 1"; // 1 key
    if (keyIsDown(50)) this.selectedPowerup = "Powerup 2"; // 2 key
    if (keyIsDown(51)) this.selectedPowerup = "Powerup 3"; // 3 key
    return this.selectedPowerup;
  }

  // getBarrelPressed() {
  //     return keyIsDown(84) ? "Button Pressed" : "Button Released"; // T key
  // }

  getBarrelPowerupPressed() {
    return keyIsDown(13) ? "Button Pressed" : "Button Released"; // enter
  }
}
