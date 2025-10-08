#include <Encoder.h>

// Arduino and KY-040 module
int encoderBtn = 8; // SW pin
int encoderPinA = 9; // CLK pin
int encoderPinB = 10; // DT pin
int count = 0;
int encoderPinA_prev;
int encoderPinA_value;
bool bool_CW = false;

void setup() {
Serial.begin(9600);
pinMode (encoderPinA, INPUT);
pinMode (encoderPinB, INPUT);
pinMode(encoderBtn, INPUT_PULLUP);
encoderPinA_prev = digitalRead(encoderPinA);
}
void loop() {
encoderPinA_value = digitalRead(encoderPinA);
//if (encoderPinA_value != encoderPinA_prev) { // check if knob is rotating
// if pin A state changed before pin B, rotation is clockwise
if (digitalRead(encoderPinB) != encoderPinA_value) {
count ++;
bool_CW = true;
} else {
// if pin B state changed before pin A, rotation is counter-clockwise
bool_CW = false;
count--;
}
if (bool_CW) {
Serial.print("Clockwise | ");
} else {
Serial.print("Counter-Clockwise | ");
}
//}
encoderPinA_prev = encoderPinA_value;
// check if button is pressed (pin SW)
if (digitalRead(encoderBtn) == LOW) Serial.println("Button Pressed");
else Serial.println("Button Released");
delay(500);
bool_CW = false;
}



