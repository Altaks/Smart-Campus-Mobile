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

/**
 * @brief Le numéro de la pin pour le premier bouton (passage de la mesure à la configuration)
 */
#define PIN_INPUT1 1
/**
 * @brief Le numéro de la pin pour le deuxième bouton (passage de la configuration à la mesure)
 *
 */
#define PIN_INPUT2 2

/**
 * @brief Les différents modes possibles du système d'acquisition
 */
enum Mode {
    CONFIGURATION=0,
    CONFIGURATION_VERS_MESURE=1,
    MESURE=2,
    MESURE_VERS_CONFIGURATION=3,
};

/**
 * @brief fonction permettant de gérer l'interruption du premier bouton
 * Cette fonction est appelée lorsqu'on appuie sur le premier bouton et met le système en mode configuration
 */
void IRAM_ATTR ISR_bouton_1();

/**
 * @brief fonction permettant de gérer l'interruption du deuxième bouton
 * Cette fonction est appelée lorsqu'on appuie sur le deuxième bouton et met le système en mode mesure
 */
void IRAM_ATTR ISR_bouton_2();

void IRAM_ATTR ISR_veille();

/**
 * @brief Fonction permettant d'initialiser les boutons
 * Initialise les boutons et les interruptions associées
 * @param modeDebut le mode de début du système (permet de savoir si on commence en mode configuration ou mesure)
 */
void initBoutons(Mode modeDebut);

/**
 * @brief Tache permettant de changer de mode en fonction des interruptions des boutons
 * @param pvParameters paramètre de la tâche, non utilisé ici
 */
void changementMode(void *pvParameters);

/**
 * @brief Fonction permettant de passer en mode configuration
 * Met le système en mode configuration en arrêtant les tâches de mesure et en lançant les tâches de configuration
 */
void modeConfiguration();

/**
 * @brief Fonction permettant de passer en mode mesure
 * Met le système en mode mesure en arrêtant les tâches de configuration et en lançant les tâches de mesure
 */
void modeMesure();

/**
 * @brief setter de la tâche de le led
 * @param taskHandle le handle de la tâche de la led
 */
void setLedTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche de recupération de la température et de l'humidité
 * @param taskHandle le handle de la tâche de recupération de la température et de l'humidité
 */
void setTempEtHumTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche de recupération de la qualité de l'air
 * @param taskHandle le handle de la tâche de recupération de la qualité de l'air
 */
void setQualAirTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche d'envoi des données
 * @param taskHandle le handle de la tâche d'envoi des données
 */
void setEnvoisTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche d'affichage
 * @param taskHandle le handle de la tâche d'affichage
 */
void setAffichageTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche de gestion des fichiers SPIFFS
 * @param taskHandle
 */
void setListeReseauTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter de la tâche du serveur web
 * @param taskHandle le handle de la tâche du serveur web
 */
void setServeurTaskHandle(xTaskHandle taskHandle);

/**
 * @brief setter des données
 * @param donnees le pointeur vers les données (doit être alloué, et être le même que celui utilisé dans les tâches)
 */
void setDonnees(Donnees *donnees);

/**
 * @brief getter du mode
 * @return le mode actuel du système
 */
Mode getMode();

/**
 * @brief setter du mode
 * @param modeNouveau le mode à mettre
 */
void setMode(Mode modeNouveau);

#endif