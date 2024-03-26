#ifndef TYPEDEF_H
#define TYPEDEF_H
#include <WString.h>

// valeurs des pins
const int pinTempEtHum = 17;

// page courante dans les valeurs (1 -> Température, 2 -> Humidité, 3 -> CO2) ;
// affichage de la luminosité et de la présence non-demandés par le client
enum PAGE {
    TEMPERATURE,
    HUMIDITE,
    CO2
};

typedef struct Donnees {
    float * temperature;
    float * humidite;
    unsigned int * co2;
}Donnees;


#endif
