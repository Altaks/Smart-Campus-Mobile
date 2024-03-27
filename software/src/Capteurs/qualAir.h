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

// Définition des constantes
#define LOOP_TIME_INTERVAL_MS  1000     // Temps d'attente entre chaque mesure de la qualité de l'air
#define BASELINE_IS_STORED_FLAG  (0x55) // Flag pour vérifier si la baseline est stockée dans l'EEPROM

/**
 * Fonction permettant d'initialiser le capteur de qualité de l'air
 */
/**
 * Fonction permettant de recupérer la valeur du capteur de CO2
 * @return La quantité de CO2 mesurer par le capteur de CO2
*/
// int getCO2();

// int getCO2WithoutMeasure();

void taskQualAir(void * pvParameters);

xTaskHandle initTaskQualAir(Donnees* donnees);

#endif //SOFTWARE_QUALAIR_H
