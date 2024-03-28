#include "qualAir.h"


Adafruit_SGP30 sgp;


[[noreturn]] void taskQualAir(void *pvParameters) {

  while (true) {
    delay(2000);
    if (sgp.IAQmeasure()) {
      *static_cast<Donnees *>(pvParameters)->co2 = sgp.eCO2;
    }
    else {
      *static_cast<Donnees *>(pvParameters)->co2 = 0;
    }
  }
}

xTaskHandle initTaskQualAir(Donnees *donnees) {
  xTaskHandle qualAirTaskHandle;
  if( sgp.begin()) {
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