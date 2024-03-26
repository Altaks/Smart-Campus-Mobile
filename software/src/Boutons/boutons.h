#include "OneButton.h"

#define PIN_INPUT1 1
#define PIN_INPUT2 2


void IRAM_ATTR ISR_bouton_1();

void IRAM_ATTR ISR_bouton_2();

void initBoutons();

void setLedTaskHandle(xTaskHandle handle);