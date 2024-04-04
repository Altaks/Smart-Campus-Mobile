#include "presence.h"

/**
 * Correspond au pin physique de la détection de présence
*/
#define PIN_PRESENCE 4

void initPresence(){

    Serial.println("Initialisation de la détection de présence");

    // On met le pin choisi en mode entrée de données
    pinMode(PIN_PRESENCE, INPUT);
}

bool getPresence()
{
    // On renvoie la valeur que le pin indique
    return digitalRead(PIN_PRESENCE);
}