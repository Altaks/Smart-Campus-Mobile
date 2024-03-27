#include "qualAir.h"


Adafruit_SGP30 sgp;

/*
void initQualAir() {
  while (!Serial) { delay(10); } // Wait for serial console to open!

  Serial.println("Initialisation capteur CO2");

  if (! sgp.begin()){
    Serial.println("Capteur CO2 non trouvé");
    while (true);
  }
  Serial.println("Capteur CO2 connecté");
}


int getCO2() {
  if (! sgp.IAQmeasure()) {
    Serial.println("Mesure échouée");
    return -1;
  } else
        return sgp.eCO2;
}

int getCO2WithoutMeasure() {
  return sgp.eCO2;
}
*/

void taskQualAir(void *pvParameters) {

  Donnees *donnees = (Donnees *) pvParameters;

  for (;;) {
    delay(2000);
    if (sgp.IAQmeasure()) {
      *donnees->co2 = sgp.eCO2;
    }
    else {
      *donnees->co2 = 0;
    }

  }
}

xTaskHandle initTaskQualAir(Donnees *donnees) {
  xTaskHandle qualAirTaskHandle;
  if( sgp.begin()) {
    xTaskCreate(
      taskQualAir,
      "taskQualAir",
      10000,
      donnees,
      9,
      &qualAirTaskHandle
    );
  }
  return qualAirTaskHandle;
}