// #include <Adafruit_Sensor.h>
// #include <Adafruit_ADXL345_U.h>

int encoderBtn = 8; // SW pin
int encoderPinA = 9; // CLK pin
int encoderPinB = 10; // DT pin
int count = 0;
int encoderPinA_prev;
int encoderPinA_value;
bool bool_CW;

int leverPin = 7;
bool leverState;
bool leverState_prev;

Adafruit_ADXL345_Unified accelerometer = Adafruit_ADXL345_Unified();
int sdaPin = A4;
int sclPin = A5;
double xState = 0;



void setup() {
    Serial.begin (9600);
    // Encoder setup
    pinMode (encoderPinA, INPUT);
    pinMode (encoderPinB, INPUT);
    pinMode(encoderBtn, INPUT_PULLUP);
    encoderPinA_prev = digitalRead(encoderPinA);
    // Lever setup
    leverState_prev = digitalRead(leverPin);
    // Accelerometer setup
    pinMode(sdaPin, INPUT);
    pinMode(sclPin, INPUT);
    if (!accelerometer.begin()) {
        Serial.println("No accelerometer found");
        while(1);
    }
    // get an event and set starting states
    sensors_event_t event;
    accelerometer.getEvent(&event);
    xState = event.acceleration.x;
}

void loop() {
    // Reload Mechanic
    encoderPinA_value = digitalRead(encoderPinA);
    if (encoderPinA_value != encoderPinA_prev) { // check if knob is rotating
        // if pin A state changed before pin B, rotation is clockwise
        if (digitalRead(encoderPinB) != encoderPinA_value) {
            bool_CW = true;
        } else {
        // if pin B state changed before pin A, rotation is counter-clockwise
            bool_CW = false;
        }
        
        // if barrel is spinning
        if (bool_CW) {
            count ++;
        } else {
            count --;
        }
    }

    Serial.print(count + " | ");

    if (digitalRead(potentiometerBtn) == LOW) Serial.print("Button Pressed | ");
    else Serial.print("Button Released | ");


    // Angle Mechanic
    sensors_event_t event;
    xState = event.acceleration.x;
    if (xState < ) {
        Serial.print("Left Lane | ");
    } else if (xState < ) {
        Serial.print("Center Lane | ");
    } else {
        Serial.print("Right Lane | ")
    }


    //Launch Mechanic
    leverPressed = digitalRead(leverPin);
    if (leverPressed == HIGH) {
        Serial.println("Lever Pressed");
    } else if ((leverState == LOW) && (leverState != leverState_prev)) {
        Serial.println("Lever Released");
    } else {
        Serial.println("Lever Not Pressed");
    }


    leverState_prev = leverState;
    encoderPinA_prev = encoderPinA_value;
}