#include "OneButton.h"

#define PIN_INPUT1 1
#define PIN_INPUT2 2


void IRAM_ATTR ISR_bouton_1();

void IRAM_ATTR ISR_bouton_2();

void initBoutons();

void changementMode(void *pvParameters);

void modeConfiguration();

void modeMesure();

void setLedTaskHandle(xTaskHandle taskHandle);

void setTempEtHumTaskHandle(xTaskHandle taskHandle);

void setQualAirTaskHandle(xTaskHandle taskHandle);

void setEnvoisTaskHandle(xTaskHandle taskHandle);

void setAffichageTaskHandle(xTaskHandle taskHandle);

void setListeReseauTaskHandle(xTaskHandle taskHandle);

void setServeurTaskHandle(xTaskHandle taskHandle);
