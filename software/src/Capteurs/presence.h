#ifndef PRESENCE_H
#define PRESENCE_H
#include "Arduino.h"

/**
 * Fonction permettant d'initialiser la détection de présence
 * @return void
*/
void initPresence();

/**
 * Fonction permettant de recupérer la valeur du capteur de présence
 * @return true si une personne est détecté | false sinon
*/
bool getPresence();

#endif //PRESENCE_H