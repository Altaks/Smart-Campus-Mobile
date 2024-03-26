#include "boutons.h"


xTaskHandle ledTaskHandle;

enum Mode {
  CONFIGURATION,
  MESURE
};

Mode mode;


void initBoutons() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Starting TwoButtons...");
  
  ledTaskHandle = NULL;

  mode = MESURE;

  attachInterrupt(PIN_INPUT1, ISR_bouton_1, FALLING);
  attachInterrupt(PIN_INPUT2, ISR_bouton_2, FALLING);
} 


void IRAM_ATTR ISR_bouton_1() {
  Serial.println("Mode configuration: suspension des tâches");
  if(mode == MESURE) {
    if(ledTaskHandle != NULL)
      vTaskSuspend(ledTaskHandle);
    
    mode = CONFIGURATION;
  }
}

void IRAM_ATTR ISR_bouton_2() {
  Serial.println("Mode mesure: reprise des tâches");
  if(mode == CONFIGURATION) {
    if(ledTaskHandle != NULL)
      vTaskResume(ledTaskHandle);

    mode = MESURE;
  }
}

void setLedTaskHandle(xTaskHandle handle) {
  ledTaskHandle = handle;
}  

