#include "tempEtHum.h"


DHTesp CapteurTempEtHum;

/*
void initTempEtHum()
{
    CapteurTempEtHum.setup(pinTempEtHum, DHTesp::AM2302); // Configuration du capteur avec pin et type
}

double getTemperature()
{
  TempAndHumidity TempEtHum = CapteurTempEtHum.getTempAndHumidity();
  return (isnan(TempEtHum.temperature) ?  -1 : round(TempEtHum.temperature * 10.0)/10.0);
}

double getHumidite()
{
  TempAndHumidity TempEtHum = CapteurTempEtHum.getTempAndHumidity();
  return (isnan(TempEtHum.humidity) ?  -1 : round(TempEtHum.humidity * 10.0)/10.0);
}
*/

void taskTempEtHum(void *pvParameters) {

  Donnees* values = (struct Donnees*) pvParameters;

  for(;;){
    delay(2000); // Délai avant nouvelle mesure
    TempAndHumidity TempEtHum = CapteurTempEtHum.getTempAndHumidity(); // Récupère les valeurs d'humidité et de température
    double temperature = (isnan(TempEtHum.temperature) ?  -1 : round(TempEtHum.temperature * 10.0)/10.0); // Arrondi la valeur et reste a NaN si NaN pour ne pas "arrondir" NaN
    double humidite = (isnan(TempEtHum.humidity) ?  -1 : round(TempEtHum.humidity * 10.0)/10.0);
    *values->temperature = temperature;
    *values->humidite = humidite;
  }
}

xTaskHandle initTaskTempEtHum(Donnees* donnees)
{
    xTaskHandle tempEtHumTaskHandle;
    CapteurTempEtHum.setup(pinTempEtHum, DHTesp::AM2302); // Configuration du capteur avec pin et type
    xTaskCreate( // Création de la tâche
      taskTempEtHum,
      "taskTempEtHum",
      10000,
      (void*)donnees,
      10,
      &tempEtHumTaskHandle
    );
    return tempEtHumTaskHandle;
}
