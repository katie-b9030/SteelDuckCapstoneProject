
const int MAGNETIC_PIN = 9;  

const int POWERUP_PIN_A = 5;   // Rotary encoder CLK
const int POWERUP_PIN_B = 6;   // Rotary encoder DT
const int POWERUP_BTN = 4;    // Rotary encoder SW (button)

//Vars
int spinCount = 0;
int sinceLastSpin = 100;
bool magnetDetected = false;

//rotary encoder variables
int powerupVal = 0;
int powerupValMod = 0;
int powerupState;
int powerupStatePrev;
bool boolPowerupCW = false;

void setup() {
  Serial.begin(9600);

  //magnet sensor setup
  pinMode(MAGNETIC_PIN, INPUT_PULLUP);

  //power-up encoder setup
  pinMode(POWERUP_PIN_A, INPUT);
  pinMode(POWERUP_PIN_B, INPUT);
  pinMode(POWERUP_BTN, INPUT_PULLUP);

  powerupStatePrev = digitalRead(POWERUP_PIN_A);

}

void loop() {
  //magnet spin
  int state = digitalRead(MAGNETIC_PIN);

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
  powerupState = digitalRead(POWERUP_PIN_A);

  if (powerupState != powerupStatePrev && powerupState == HIGH) {
    if (digitalRead(POWERUP_PIN_B) != powerupState) {
      powerupVal++;
    } else {
      powerupVal--;
    }
  }

  powerupValMod = abs(powerupVal % 6); 

  // Serial.print("Power-up Selected: ");
  if (powerupValMod < 2) {
    Serial.print("shield | ");
  } else if (powerupValMod < 4) {
    Serial.print("chest | ");
  } else {
    Serial.print("helmet | ");
  }

  //encoder button press
  if (digitalRead(POWERUP_BTN) == LOW) {
    Serial.println("Button Pressed");
  } else {
    Serial.println("Button Released");
  }


  delay(100);
  powerupStatePrev = powerupState;
}
