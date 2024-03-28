#include "boutons.h"


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
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Starting TwoButtons...");
  
  handle.led = NULL;
  handle.tempEtHum = NULL;
  handle.qualAir = NULL;
  handle.envois = NULL;
  handle.affichage = NULL;
  handle.listeReseau = NULL;
  handle.serveur = NULL;

  mode = modeDebut;

  attachInterrupt(PIN_INPUT1, ISR_bouton_1, FALLING);
  attachInterrupt(PIN_INPUT2, ISR_bouton_2, FALLING);

  xTaskCreate( //création de la tâche
    changementMode,
    "changement vers le mode configuration",
    8000,
    NULL,
    1,
    &changementModeTaskHandle
  );
  vTaskSuspend(changementModeTaskHandle);
} 


void IRAM_ATTR ISR_bouton_1() {
  Serial.println("Interruption bouton");
  if(mode == MESURE) {
    mode = MESURE_VERS_CONFIGURATION;
    vTaskResume(changementModeTaskHandle);
  }
}

void IRAM_ATTR ISR_bouton_2() {
  Serial.println("Interruption bouton");
  if(mode == CONFIGURATION) {
    mode = CONFIGURATION_VERS_MESURE;
    vTaskResume(changementModeTaskHandle);
  }
}

void changementMode(void *pvParameters) {
  
  while(true) {
    if(mode == MESURE_VERS_CONFIGURATION) {
      modeConfiguration();
      vTaskSuspend(NULL);
    }
    else if(mode == CONFIGURATION_VERS_MESURE) {
      modeMesure();
      vTaskSuspend(NULL);
    }
  }
}

void modeConfiguration()
{
  Serial.println("Mode configuration: suspension des tâches");

  if(handle.led != NULL) {
    vTaskSuspend(handle.led);
    vTaskDelete(handle.led);
    handle.led = NULL;
  }

  if(handle.tempEtHum != NULL) {
    vTaskSuspend(handle.tempEtHum);
    vTaskDelete(handle.tempEtHum);
    handle.tempEtHum = NULL;
  }

  if(handle.qualAir != NULL) {
    vTaskSuspend(handle.qualAir);
    vTaskDelete(handle.qualAir);
    handle.qualAir = NULL;
  }

  if(handle.envois != NULL) {
    vTaskSuspend(handle.envois);
    vTaskDelete(handle.envois);
    handle.envois = NULL;
  }

  if(handle.affichage != NULL) {
    vTaskSuspend(handle.affichage);
    vTaskDelete(handle.affichage);
    handle.affichage = NULL;
  }

  if(handle.listeReseau != NULL) {
    vTaskResume(handle.listeReseau);
  }

  setLEDColor(60,0,255);

  String nomAP = recupererValeur("/infoap.txt","nom_ap");
  String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");

  displayText("Nom du Wifi : \n" + nomAP+"\nIP : "+getIP(),0,10);

  disconnect();

  initReseauStationEtPointAcces();
  creerPointAcces(nomAP, motDePasseAP);

  if(handle.serveur != NULL){
    vTaskResume(handle.serveur);
  } else {
    setServeurTaskHandle(activerServeurDNS());
  }

  mode = CONFIGURATION;
}

void modeMesure()
{
  Serial.println("Mode mesure: reprise des tâches");

  Serial.println("Led");
  if(handle.led != NULL) {
    vTaskResume(handle.led);
  }else{
    initLED();
  }

  Serial.println("temp et hum");
  if(handle.tempEtHum != NULL) {
    vTaskResume(handle.tempEtHum);
  } else {
    initTaskTempEtHum(donneesBoutons);
  }

  Serial.println("air");
  if(handle.qualAir != NULL) {
    vTaskResume(handle.qualAir);
  } else {
    initTaskQualAir(donneesBoutons);
  }

  Serial.println("envois");
  if(handle.envois != NULL) {
    vTaskResume(handle.envois);
  } else {
    initEnvois(donneesBoutons);
  }

  Serial.println("Affichage");
  if(handle.affichage != NULL) {
    vTaskResume(handle.affichage);
  } else {
    initTacheAffichage(donneesBoutons);
  }

  Serial.println("ListeReseau");
  if(handle.listeReseau != NULL) {
    vTaskSuspend(handle.listeReseau);
    vTaskDelete(handle.listeReseau);
    handle.listeReseau = NULL;
  }

  Serial.println("Reseau");
  initReseauStation();

  Serial.println("Serveur");
  if(handle.serveur != NULL){
    vTaskSuspend(handle.serveur);
    vTaskDelete(handle.serveur);
    handle.serveur = NULL;
  }

  mode = MESURE;
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