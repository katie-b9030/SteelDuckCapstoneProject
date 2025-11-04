
const int magneticPin = 9;  

const int powerupPinA = 5;   // Rotary encoder CLK
const int powerupPinB = 6;   // Rotary encoder DT
const int powerupBtn = 4;    // Rotary encoder SW (button)

//Vars
int spinCount = 0;
int sinceLastSpin = 100;
bool magnetDetected = false;

//rotary encoder variables
int powerupVal = 0;
int powerupVal_mod = 0;
int powerupState;
int powerupState_prev;
bool bool_powerup_CW = false;

void setup() {
  Serial.begin(9600);

  //magnet sensor setup
  pinMode(magneticPin, INPUT_PULLUP);

  //power-up encoder setup
  pinMode(powerupPinA, INPUT);
  pinMode(powerupPinB, INPUT);
  pinMode(powerupBtn, INPUT_PULLUP);

  powerupState_prev = digitalRead(powerupPinA);

}

void loop() {
  //magnet spin
  int state = digitalRead(magneticPin);

  if (state == LOW && !magnetDetected) {
    magnetDetected = true;
    spinCount++;
  }
  else if (state == HIGH && magnetDetected) {
    magnetDetected = false;
  }
  
  Serial.print(spinCount);
  Serial.print(" | ");

  //rotary encoder
  powerupState = digitalRead(powerupPinA);

  if (powerupState != powerupState_prev && powerupState == HIGH) {
    if (digitalRead(powerupPinB) != powerupState) {
      powerupVal++;
    } else {
      powerupVal--;
    }
  }

  powerupVal_mod = abs(powerupVal % 6); 

  // Serial.print("Power-up Selected: ");
  if (powerupVal_mod < 2) {
    Serial.print("SHIELD | ");
  } else if (powerupVal_mod < 4) {
    Serial.print("CHEST | ");
  } else {
    Serial.print("HELMET | ");
  }

  //encoder button press
  if (digitalRead(powerupBtn) == LOW) {
    Serial.println("Button Pressed");
  } else {
    Serial.println("Button Released");
  }


  delay(100);
  powerupState_prev = powerupState;
}
