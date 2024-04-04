#include "boutons.h"
#include "task.h"
#include "../LED/led.h"

/**
 * @brief structure permettant de stocker les différentes tâches du système
 */
struct Handle {
  /**
   * @brief handle de la tâche de la led
   */
  xTaskHandle led;
  /**
   * @brief handle de la tâche de récupération de la température et de l'humidité
   */
  xTaskHandle tempEtHum;
  /**
   * @brief handle de la tâche de récupération de la qualité de l'air
   */
  xTaskHandle qualAir;
  /**
   * @brief handle de la tâche d'envoi des données
   */
  xTaskHandle envois;
  /**
   * @brief handle de la tâche d'affichage
   */
  xTaskHandle affichage;
  /**
   * @brief handle de la tâche de gestion des fichiers SPIFFS
   */
  xTaskHandle listeReseau;
  /**
   * @brief handle de la tâche du serveur web
   */
  xTaskHandle serveur;
};

/**
 * @brief variable stockant les handles des différentes tâches
 */
Handle handle;

/**
 * @brief variable stockant le mode actuel du système
 */
Mode mode;

/**
 * @brief pointeur vers les données
 */
Donnees * donneesBoutons;

/**
 * @brief handle de la tâche de changement de mode
 */
xTaskHandle changementModeTaskHandle;

void initBoutons(Mode modeDebut) {
  Serial.println("Starting TwoButtons...");

  Serial.println("Initialisation des données");

  // initialisation des handle
  handle.led = nullptr;
  handle.tempEtHum = nullptr;
  handle.qualAir = nullptr;
  handle.envois = nullptr;
  handle.affichage = nullptr;
  handle.listeReseau = nullptr;
  handle.serveur = nullptr;

  Serial.println("Initialisation des boutons");

  mode = modeDebut;

  // initialisation des boutons
  attachInterrupt(PIN_INPUT1, ISR_bouton_1, FALLING);
  attachInterrupt(PIN_INPUT2, ISR_bouton_2, FALLING);

  Serial.println("Initialisation de la tâche changementMode");

  // initialisation de la tâche changementMode
  xTaskCreate( //création de la tâche
    changementMode,
    "changement vers le mode configuration",
    2000,
    nullptr,
    20,
    &changementModeTaskHandle
  );
  Serial.println("Suspension de la tâche changementMode");
  vTaskSuspend(changementModeTaskHandle);
  Serial.println("TwoButtons started.");
}


void IRAM_ATTR ISR_bouton_1() {
  // surtout pas de Serial.println() ici car cela cause une erreur si une interruption se produit pendant l'envoi de données
  // ou qu'une tâche est en cours d'exécution
  if(mode == MESURE) {
    mode = MESURE_VERS_CONFIGURATION;
    vTaskResume(changementModeTaskHandle);
  }
}

void IRAM_ATTR ISR_bouton_2() {
  // surtout pas de Serial.println() ici car cela cause une erreur si une interruption se produit pendant l'envoi de données
  // ou qu'une tâche est en cours d'exécution
  if(mode == CONFIGURATION) {
    mode = CONFIGURATION_VERS_MESURE;
    vTaskResume(changementModeTaskHandle);
  }
}

void changementMode(void *pvParameters) {
  while(true) {
    if(mode == MESURE_VERS_CONFIGURATION) {
      modeConfiguration();
    }
    else if(mode == CONFIGURATION_VERS_MESURE) {
      modeMesure();
    }
    vTaskSuspend(nullptr);
  }
}

void modeConfiguration()
{
  while(envoieEnCours() || dateEnInitialisation()){delay(1000);} // attend que l'envoi en cours soit terminé pour éviter les données incohérentes ou corrompues en base de données
  Serial.println("Mode configuration: suspension des tâches");
  mode = CONFIGURATION; // les tâches se suspendent automatiquement

  delay(3000); // attente de 3 secondes pour laisser le temps aux tâches de s'arrêter

  while (tacheLedEnCours() || tacheTempEtHumEnCours() || tacheQualAirEnCours() || tacheEnvoisEnCours() || tacheAffichageEnCours()) {
    delay(1000);
  } // pour être sûr que les tâches soient bien arrêtées

  Serial.printf("Tache led en cours : %s\n", tacheLedEnCours() ? "oui" : "non");
  Serial.printf("Tache envois en cours : %s\n", tacheEnvoisEnCours() ? "oui" : "non");
  Serial.printf("Tache affichage en cours : %s\n", tacheAffichageEnCours() ? "oui" : "non");
  Serial.printf("Tache temp et hum en cours : %s\n", tacheTempEtHumEnCours() ? "oui" : "non");
  Serial.printf("Tache qual air en cours : %s\n", tacheQualAirEnCours() ? "oui" : "non");


  handle.affichage = nullptr;
  handle.envois = nullptr;
  handle.led = nullptr;
  handle.qualAir = nullptr;
  handle.tempEtHum = nullptr;

  Serial.println("Reseau");
  if(handle.listeReseau != nullptr) {
    vTaskResume(handle.listeReseau); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  }

  setLEDColor(60,0,255);

  String nomAP = recupererValeur("/infoap.txt","nom_ap");
  String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");

  disconnect();

  initReseauStationEtPointAcces();
  creerPointAcces(nomAP, motDePasseAP);

  Serial.println("Serveur");
  if(handle.serveur != nullptr){
    vTaskResume(handle.serveur); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  } else {
    setServeurTaskHandle(activerServeurDNS()); // si le serveur n'est pas initialisé on le fait
  }

  clearDisplay();
  displayText("Nom du Wifi : \n" + nomAP+"\nIP : "+getIP(),0,10); // affichage de l'ip du serveur et du nom du wifi


}

void modeMesure()
{
  clearDisplay();
  Serial.println("Mode mesure: reprise des tâches");
  mode = MESURE; // les tâches se reprennent automatiquement

  delay(3000); // attente de 3 secondes pour laisser le temps aux tâches de se reprendre

  while (tacheListeReseauEnCours() || serveurEnCours()) {
    delay(1000);
  }

  Serial.printf("Tache liste reseau en cours : %s\n", tacheListeReseauEnCours() ? "oui" : "non");
  Serial.printf("Tache serveur en cours : %s\n", serveurEnCours() ? "oui" : "non");

  Serial.println("Reseau");
  initReseauStation(); // on réinitialise le wifi en mode station

  Serial.println("Led");
  if(handle.led != nullptr) {
    vTaskResume(handle.led); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  }else{
    handle.led = initTaskLED(donneesBoutons); // on réinitialise la tâche de la led
  }

  Serial.println("temp et hum");
  if(handle.tempEtHum != nullptr) {
    vTaskResume(handle.tempEtHum); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  } else {
    handle.tempEtHum = initTaskTempEtHum(donneesBoutons); // on réinitialise la tâche de température et d'humidité
  }

  Serial.println("air");
  if(handle.qualAir != nullptr) {
    vTaskResume(handle.qualAir); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  } else {
    handle.qualAir = initTaskQualAir(donneesBoutons); // on réinitialise la tâche de qualité de l'air
  }

  Serial.println("envois");
  if(handle.envois != nullptr) {
    vTaskResume(handle.envois); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  } else {
    handle.envois = initEnvois(donneesBoutons); // on réinitialise la tâche d'envoi
  }

  Serial.println("Affichage");
  if(handle.affichage != nullptr) {
    vTaskResume(handle.affichage); // en cas de bug pendant le changement de mode le handle n'est pas réinitialisé
  } else {
    handle.affichage = initTacheAffichage(donneesBoutons); // on réinitialise la tâche d'affichage
  }
  Serial.println("Mode mesure: tâches reprises");
}




void setLedTaskHandle(xTaskHandle taskHandle) {
  handle.led = taskHandle;
}  

void setTempEtHumTaskHandle(xTaskHandle taskHandle) {
  handle.tempEtHum = taskHandle;
}  

void setQualAirTaskHandle(xTaskHandle taskHandle) {
  handle.qualAir = taskHandle;
}  

void setEnvoisTaskHandle(xTaskHandle taskHandle) {
  handle.envois = taskHandle;
}  

void setAffichageTaskHandle(xTaskHandle taskHandle) {
  handle.affichage = taskHandle;
}  

void setListeReseauTaskHandle(xTaskHandle taskHandle) {
  handle.listeReseau = taskHandle;
}  

void setServeurTaskHandle(xTaskHandle taskHandle) {
  handle.serveur = taskHandle;
}

void setDonnees(Donnees *donnees) {
  donneesBoutons = donnees;
}

Mode getMode() {
  return mode;
}

void setMode(Mode modeNouveau) {
  // fonctionne comme les interruptions
  if (modeNouveau == MESURE) {
    mode = CONFIGURATION_VERS_MESURE;
  } else if (modeNouveau == CONFIGURATION) {
    mode = MESURE_VERS_CONFIGURATION;
  }

  vTaskResume(changementModeTaskHandle);
}