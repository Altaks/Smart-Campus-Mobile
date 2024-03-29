#ifndef BOUTONS_H
#define BOUTONS_H

#include "OneButton.h"
#include "../typeDef.h"
#include "../LED/led.h"
#include "../Fichiers/fichierSPIFFS.h"
#include "../Reseaux/station.h"
#include "../Reseaux/pointAcces.h"
#include "../Affichage/affichage.h"
#include "../Serveur/serveurWeb.h"
#include "../Capteurs/tempEtHum.h"
#include "../Capteurs/qualAir.h"
#include "../envois/envois.h"


#define PIN_INPUT1 1
#define PIN_INPUT2 2

enum Mode {
    CONFIGURATION=0,
    CONFIGURATION_VERS_MESURE=1,
    MESURE=2,
    MESURE_VERS_CONFIGURATION=3,
};

void IRAM_ATTR ISR_bouton_1();

void IRAM_ATTR ISR_bouton_2();

void initBoutons(Mode);

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

void setDonnees(Donnees *donnees);

Mode getMode();

#endif