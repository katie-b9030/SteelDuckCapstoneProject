int encoderBtn = 8; // SW pin
int encoderPinA = 9; // CLK pin
int encoderPinB = 10; // DT pin
int count = 0;
int encoderPinA_prev;
int encoderPinA_value;
bool bool_CW;

int leverPin = ;
bool leverState;
bool leverState_prev;

int accelerometerPin = ;



void setup() {
    Serial.begin (9600);
    pinMode (encoderPinA, INPUT);
    pinMode (encoderPinB, INPUT);
    pinMode(encoderBtn, INPUT_PULLUP);
    encoderPinA_prev = digitalRead(encoderPinA);
    leverState_prev = digitalRead(leverPin);
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

        // TODO: set bool_CW
        
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