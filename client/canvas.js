"use strict";
import * as arduino from './arduino.js'


window.setup = function () {
  createCanvas(600, 400);
  background('black');

  fill('red');
  square(100, 200, 100);

  fill('yellow');
  circle(400, 200, 100);
}