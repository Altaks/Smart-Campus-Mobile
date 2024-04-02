#include "boutons.h"
#include "task.h"
#include "../LED/led.h"


struct Handle {
  xTaskHandle led;
  xTaskHandle tempEtHum;
  xTaskHandle qualAir;
  xTaskHandle envois;
  xTaskHandle affichage;
  xTaskHandle listeReseau;
  xTaskHandle serveur;
};

Handle handle;

Mode mode;

Donnees * donneesBoutons;

xTaskHandle changementModeTaskHandle;

void initBoutons(Mode modeDebut) {
  Serial.println("Starting TwoButtons...");

  Serial.println("Initialisation des données");

  handle.led = nullptr;
  handle.tempEtHum = nullptr;
  handle.qualAir = nullptr;
  handle.envois = nullptr;
  handle.affichage = nullptr;
  handle.listeReseau = nullptr;
  handle.serveur = nullptr;

  Serial.println("Initialisation des boutons");

  mode = modeDebut;

  attachInterrupt(PIN_INPUT1, ISR_bouton_1, FALLING);
  attachInterrupt(PIN_INPUT2, ISR_bouton_2, FALLING);

  Serial.println("Initialisation de la tâche changementMode");

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
  mode = CONFIGURATION;

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
    vTaskResume(handle.listeReseau);
  }

  setLEDColor(60,0,255);

  String nomAP = recupererValeur("/infoap.txt","nom_ap");
  String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");

  disconnect();

  initReseauStationEtPointAcces();
  creerPointAcces(nomAP, motDePasseAP);

  Serial.println("Serveur");
  if(handle.serveur != nullptr){
    vTaskResume(handle.serveur);
  } else {
    setServeurTaskHandle(activerServeurDNS());
  }

  clearDisplay();
  displayText("Nom du Wifi : \n" + nomAP+"\nIP : "+getIP(),0,10);


}

void modeMesure()
{
  clearDisplay();
  Serial.println("Mode mesure: reprise des tâches");
  mode = MESURE;

  delay(3000);

  while (tacheListeReseauEnCours() || serveurEnCours()) {
    delay(1000);
  }

  Serial.printf("Tache liste reseau en cours : %s\n", tacheListeReseauEnCours() ? "oui" : "non");
  Serial.printf("Tache serveur en cours : %s\n", serveurEnCours() ? "oui" : "non");

  Serial.println("Reseau");
  initReseauStation();

  Serial.println("Led");
  if(handle.led != nullptr) {
    vTaskResume(handle.led);
  }else{
    handle.led = initTaskLED(donneesBoutons);
  }

  Serial.println("temp et hum");
  if(handle.tempEtHum != nullptr) {
    vTaskResume(handle.tempEtHum);
  } else {
    handle.tempEtHum = initTaskTempEtHum(donneesBoutons);
  }

  Serial.println("air");
  if(handle.qualAir != nullptr) {
    vTaskResume(handle.qualAir);
  } else {
    handle.qualAir = initTaskQualAir(donneesBoutons);
  }

  Serial.println("envois");
  if(handle.envois != nullptr) {
    vTaskResume(handle.envois);
  } else {
    handle.envois = initEnvois(donneesBoutons);
  }

  Serial.println("Affichage");
  if(handle.affichage != nullptr) {
    vTaskResume(handle.affichage);
  } else {
    handle.affichage = initTacheAffichage(donneesBoutons);
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
  if (modeNouveau == MESURE) {
    mode = CONFIGURATION_VERS_MESURE;
  } else if (modeNouveau == CONFIGURATION) {
    mode = MESURE_VERS_CONFIGURATION;
  }

  vTaskResume(changementModeTaskHandle);
}