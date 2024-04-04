#include "qualAir.h"

#include <Boutons/boutons.h>

/**
 * @brief pointeur vers le capteur de qualité de l'air
 */
Adafruit_SGP30 * sgp;

/**
 * @brief variable permettant de savoir si la tâche de récupération de la qualité de l'air est en cours
 */
bool etatAir = false;

void taskQualAir(void *pvParameters) {
  etatAir = true; // On passe l'état à true pour dire que la tâche est en cours
  while (getMode() == MESURE) {  // Tant que le mode est en MESURE
    delay(2000); // Délai avant nouvelle mesure 2s pour être sûr que l'affichage ai la nouvelle valeur
    if (sgp->IAQmeasure()) { // verifie que la mesure est bien faite
      *static_cast<Donnees *>(pvParameters)->co2 = sgp->eCO2;
    }
    else { // signale une erreur si la mesure n'est pas faite
      *static_cast<Donnees *>(pvParameters)->co2 = 0;
    }
  }
  delete sgp; // Suppression du capteur pour libérer la mémoire
  etatAir = false; // On passe l'état à false pour dire que la tâche est terminée
  vTaskDelete(nullptr);
}

xTaskHandle initTaskQualAir(Donnees *donnees) {
  xTaskHandle qualAirTaskHandle = nullptr; // Création du handle de la tâche
  sgp = new Adafruit_SGP30(); // Création du capteur
  if( sgp->begin()) { // Si le capteur est bien créé
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
    // Retourne l'état de la tâche
    return etatAir;
}