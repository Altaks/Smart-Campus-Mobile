#ifndef TEMPETHUM_H
#define TEMPETHUM_H

#include "DHTesp.h"
#include "typeDef.h"
#include <cmath>


/**
 * Initialise le capteur et la tâche, et teste si l'initialisation s'est bien déroulée
*/
// void  initTempEtHum();

/**
 * Fonction permettant de récupérer la valeur du capteur de température
 * @return La température mesurée par le capteur de température
*/
// double getTemperature();

/**
 * Fonction permettant de récupérer la valeur du capteur d'humidité
 * @return L'humidité dans l'air en pourcentage mesurée par le capteur d'humidité
*/
// double getHumidite();


void taskTempEtHum(void *pvParameters);

xTaskHandle initTaskTempEtHum(Donnees* donnees);

#endif