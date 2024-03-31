#include "qualAir.h"

#include <Boutons/boutons.h>


Adafruit_SGP30 * sgp;
bool etatAir = false;

void taskQualAir(void *pvParameters) {
  etatAir = true;
  while (getMode() == MESURE) {
    delay(2000);
    if (sgp->IAQmeasure()) {
      *static_cast<Donnees *>(pvParameters)->co2 = sgp->eCO2;
    }
    else {
      *static_cast<Donnees *>(pvParameters)->co2 = 0;
    }
  }
  delete sgp;
  etatAir = false;
  vTaskDelete(nullptr);
}

xTaskHandle initTaskQualAir(Donnees *donnees) {
  xTaskHandle qualAirTaskHandle;
  sgp = new Adafruit_SGP30();
  if( sgp->begin()) {
    xTaskCreate(
      taskQualAir,
      "taskQualAir",
      1000,
      donnees,
      9,
      &qualAirTaskHandle
    );
  }
  return qualAirTaskHandle;
}

bool tacheQualAirEnCours() {
    return etatAir;
}