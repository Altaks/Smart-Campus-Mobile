#ifndef LED_H
#define LED_H
#include <Adafruit_NeoPixel.h>
#include <typeDef.h>

/**
 * Permet d'intialiser la LED
*/
void initLED();

/**
 * Permet d'intialiser la tâche de clignotement de la LED
*/
TaskHandle_t initTaskLED(Donnees *);

/**
 * Tâche qui va produire le clignotement de la LED avec une couleur correspondante aux erreurs
*/
void taskLED(void *PvParameters);

/**
 * Permet d'indiquer si l'envoie des données est réussi ou non
*/
void setEnvoieState(bool envoie);

/**
 * Permet de changer la couleur de la LED
*/
void setLEDColor(int r, int g, int b);

#endif //LED_H