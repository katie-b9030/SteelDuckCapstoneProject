
const int magneticPin = 9;   
int count = 0;             
bool magnetDetected = false;

void setup() {
  Serial.begin(9600);
  pinMode(magneticPin, INPUT_PULLUP); 
}

void loop() {
  int state = digitalRead(magneticPin);

  if (state == LOW && !magnetDetected) {
    magnetDetected = true;
    count++;
    Serial.print("Magnet Detected! Count = ");
    Serial.println(count);
  }


  if (state == HIGH && magnetDetected) {
    magnetDetected = false;
    Serial.println("Magnet Removed.");
  }

  delay(200); 
}
