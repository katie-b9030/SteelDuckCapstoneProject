const int MAGNETIC_PIN = 9;  
const int POWERUP_BTN = 10;    // Arcade button
const char* POWERUPS[] = {
  "shield",
  "chest",
  "helmet"
};
const int MAX_SPINS = 10;


//Vars
int spinCount = 0;
bool magnetDetected = false;
bool powerupSelected = false;
bool buttonPressedLast = false;
int i = 0;
String selectedPowerup = POWERUPS[i];


void setup() {
  Serial.begin(9600);

  //magnet sensor setup
  pinMode(MAGNETIC_PIN, INPUT_PULLUP);

  // arcade button setup
  pinMode(POWERUP_BTN, INPUT_PULLUP);


}

void loop() {
  int buttonState = digitalRead(POWERUP_BTN);

  if(powerupSelected == false) {
    spinCount = 0;
    Serial.print(spinCount);
    Serial.print(" | ");

    int state = digitalRead(MAGNETIC_PIN);

    if (state == LOW && !magnetDetected) {
      magnetDetected = true;
      i = (i == 2) ? 0 : i + 1;
    }
    else if (state == HIGH && magnetDetected) {
      magnetDetected = false;
    }

    selectedPowerup = POWERUPS[i];

    Serial.print(selectedPowerup);
    Serial.print(" | ");

    if (buttonState == LOW && !buttonPressedLast) {
      Serial.println("Button Pressed");
      powerupSelected = true;
    } else {
      Serial.println("Button Released");
    }
  }
  else {
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

    Serial.print(selectedPowerup);
    Serial.print( " | ");  

    if(spinCount >= MAX_SPINS) spinCount = MAX_SPINS;

    //arcade button press
    if (buttonState == LOW && !buttonPressedLast && spinCount == MAX_SPINS) {
      Serial.println("Button Pressed");
      powerupSelected = false;
      i = 0;
    } else {
      Serial.println("Button Released");
    }
    buttonPressedLast = (buttonState == LOW);
  }





  


  
}
