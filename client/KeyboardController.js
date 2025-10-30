export class KeyboardController {
  update() {}

  getBarrelDirection() {
    if (keyIsDown(RIGHT_ARROW)) return "Clockwise";
    if (keyIsDown(LEFT_ARROW)) return "Counter-Clockwise";
    return "None";
  }

  getBarrelPowerup() {
    if (keyIsDown(49)) return "Powerup 1"; // 1 key
    if (keyIsDown(50)) return "Powerup 2"; // 2 key
    if (keyIsDown(51)) return "Powerup 3"; // 3 key
    return "None";
  }
  getBarrelPressed() {
    return keyIsDown(84) ? "Button Pressed" : "Button Released"; // T key
  }

  getBarrelPowerupPressed() {
    return keyIsDown(32) ? "Button Pressed" : "Button Released"; // space
  }
}
