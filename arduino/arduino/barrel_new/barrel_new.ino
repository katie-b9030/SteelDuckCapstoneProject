// #include <Encoder.h>

// Arduino and KY-040 module
int encoderBtn = 8; // SW pin
int encoderPinA = 9; // CLK pin
int encoderPinB = 10; // DT pin
int count = 0;
int encoderPinA_prev;
int encoderPinA_value;
bool bool_CW = false;

int powerupBtn = 4;
int powerupPinA = 5;
int powerupPinB = 6;
int powerupVal = 0;
int powerupVal_mod;
int powerupState;
int powerupState_prev;
bool bool_powerup_CW = false;

void setup() {
    Serial.begin (9600);
    pinMode (encoderPinA, INPUT);
    pinMode (encoderPinB, INPUT);
    pinMode(encoderBtn, INPUT_PULLUP);
    encoderPinA_prev = digitalRead(encoderPinA);

    pinMode (powerupPinA, INPUT);
    pinMode (powerupPinB, INPUT);
    pinMode (powerupBtn, INPUT_PULLUP);
    powerupState_prev = digitalRead(powerupPinA);
}

void loop() {
    // Spinning mMchanic
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

        // if (bool_spinning) {
            if (bool_CW) {
                Serial.print("Clockwise | ");
            } else {
                Serial.print("Counter-Clockwise | ");
            }
        // } // else {
        //     Serial.print("Not Spinning | ");
        // }
    } else {
        Serial.print("Not Spinning | ");
    }

    // // check if button is pressed (pin SW)
    if (digitalRead(encoderBtn) == LOW) Serial.print("Button Pressed | ");
    else Serial.print("Button Released | ");


    //Powerup Mechanic
    powerupState = digitalRead(powerupPinA);

    if (powerupState != powerupState_prev && powerupState == HIGH) {
        if (digitalRead(powerupPinB) != powerupState) {
            powerupVal ++;
        } else {
            powerupVal --;
        }
    }

    powerupVal_mod = abs(powerupVal % 6);

    if (powerupVal_mod < 2) {
        Serial.print("Powerup 1 | ");
    }
    else if (powerupVal_mod < 4) {
        Serial.print("Powerup 2 | ");
    } else {
        Serial.print("Powerup 3 | ");
    }

    if (digitalRead(powerupBtn) == LOW) Serial.println("Button Pressed");
    else Serial.println("Button Released");
    

    delay(100);
    encoderPinA_prev = encoderPinA_value;
    powerupState_prev = powerupState;
}
