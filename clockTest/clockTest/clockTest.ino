// Rotary Encoder Example
// CLK → D2, DT → D3, SW → D4 (optional)

#define CLK 5
#define DT 6
#define SW 4  // optional push button

int counter = 0;
int currentStateCLK;
int lastStateCLK;
String currentDir = "";
int currentData;

void setup() {
  pinMode(CLK, INPUT);
  pinMode(DT, INPUT);
  pinMode(SW, INPUT_PULLUP);

  Serial.begin(9600);

  // Read the initial state of CLK
  lastStateCLK = digitalRead(CLK);
}

void loop() {
  // Read the current state of CLK
  currentStateCLK = digitalRead(CLK);
  currentData = digitalRead(DT);


  // If the state has changed, the knob has moved
  if (currentStateCLK != lastStateCLK && currentStateCLK == HIGH) {
    // Check DT to determine direction
    if (digitalRead(DT) != currentStateCLK) {
      counter++;
      currentDir = "CW";
    } else {
      counter--;
      currentDir = "CCW";
    }

    Serial.print("Direction: ");
    Serial.print(currentDir);
    Serial.print(" | Counter: ");
    Serial.println(counter);
    Serial.println(currentData);
  }

  // Save the last state
  lastStateCLK = currentStateCLK;

  // Optional: read the button
  if (digitalRead(SW) == LOW) {
    Serial.println("Button pressed!");
    delay(300);  // debounce
  }
}

