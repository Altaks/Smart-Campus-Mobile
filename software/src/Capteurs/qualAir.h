//
// Created by altaks on 06/12/23.
//

#ifndef SOFTWARE_QUALAIR_H
#define SOFTWARE_QUALAIR_H

// Inclusion des librairies principales


// Inclusion des librairies du projet
#include "typeDef.h"

#include "Arduino.h"
#include <EEPROM.h>

#include <Wire.h>
#include <Adafruit_SGP30.h>

/**
 * @brief Fonction de la tâche de récupération de la qualité de l'air
 * @param pvParameters paramètre de la tâche, (ici les données à modifier)
 */
void taskQualAir(void * pvParameters);

/**
 * @brief Fonction permettant d'initialiser la tâche de récupération de la qualité de l'air
 * @param donnees les données à modifier
 * @return le handle de la tâche si la récupération s'est bien passée, nullptr sinon
 */
xTaskHandle initTaskQualAir(Donnees* donnees);

/**
 * @brief Fonction permettant de savoir si la tâche de récupération de la qualité de l'air est en cours
 * @return true si la tâche de récupération de la qualité de l'air est en cours, false sinon
 */
bool tacheQualAirEnCours();

#endif //SOFTWARE_QUALAIR_H
