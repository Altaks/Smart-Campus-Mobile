#ifndef TEMPETHUM_H
#define TEMPETHUM_H

#include "DHTesp.h"
#include "typeDef.h"
#include <cmath>

/**
 * @brief Fonction de la tâche de récupération de la température et de l'humidité
 * @param pvParameters paramètre de la tâche, (ici les données à modifier)
 */
void taskTempEtHum(void *pvParameters);

/**
 * @brief Fonction permettant d'initialiser la tâche de récupération de la température et de l'humidité
 * @param donnees les données à modifier
 * @return true si la récupération s'est bien passée, false sinon
 */
xTaskHandle initTaskTempEtHum(Donnees* donnees);

/**
 * @brief Fonction permettant de savoir si la tâche de récupération de la température et de l'humidité est en cours
 * @return true si la tâche de récupération de la température et de l'humidité est en cours, false sinon
 */
bool tacheTempEtHumEnCours();

#endif