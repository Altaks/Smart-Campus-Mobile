#include "tempEtHum.h"

#include <Boutons/boutons.h>


DHTesp * CapteurTempEtHum;
bool etatTempEtHum = false;

void taskTempEtHum(void *pvParameters) {
    etatTempEtHum = true;
    while(getMode()){
        delay(2000); // Délai avant nouvelle mesure 2s pour être sûr que l'affichage ai la nouvelle valeur

        TempAndHumidity TempEtHum = CapteurTempEtHum->getTempAndHumidity(); // Récupère les valeurs d'humidité et de température
        *static_cast<Donnees *>(pvParameters)->temperature = static_cast<float>(isnan(TempEtHum.temperature) ? -1 : round(TempEtHum.temperature * 10.0) / 10.0); // Arrondi la valeur et reste a NaN si NaN pour ne pas "arrondir" NaN
        *static_cast<Donnees *>(pvParameters)->humidite = static_cast<float>(isnan(TempEtHum.humidity) ? -1 : round(TempEtHum.humidity * 10.0) / 10.0); // Arrondi la valeur et reste a NaN si NaN pour ne pas "arrondir" NaN
    }
    delete CapteurTempEtHum;
    etatTempEtHum = false;
    vTaskDelete(nullptr);

}

xTaskHandle initTaskTempEtHum(Donnees* donnees)
{
    xTaskHandle tempEtHumTaskHandle;
    CapteurTempEtHum = new DHTesp();
    CapteurTempEtHum->setup(pinTempEtHum, DHTesp::AM2302); // Configuration du capteur avec pin et type
    xTaskCreate( // Création de la tâche
        taskTempEtHum,
        "taskTempEtHum",
        1000,
        (void*)donnees,
        10,
        &tempEtHumTaskHandle
    );
    return tempEtHumTaskHandle;
}

bool tacheTempEtHumEnCours()
{
    return etatTempEtHum;
}