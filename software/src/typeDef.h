#ifndef TYPEDEF_H
#define TYPEDEF_H
#include <WString.h>


/**
 * @brief Pin du capteur de température et d'humidité
 */
const int pinTempEtHum = 17;

// page courante dans les valeurs (1 -> Température, 2 -> Humidité, 3 -> CO2) ;
// affichage de la luminosité et de la présence non-demandés par le client
/**
 * Page courante dans les valeurs (1 -> Température, 2 -> Humidité, 3 -> CO2) ;
 */
enum PAGE {
    TEMPERATURE,
    HUMIDITE,
    CO2
};

/**
 * @brief Structure contenant les données à envoyer
 * @details Cette structure est utilisée pour stocker les données à envoyer et à afficher
 */
typedef struct Donnees {
    /**
     * @brief Température
     * @details Température captée par le capteur
     */
    float * temperature;
    /**
     * @brief Humidité
     * @details Humidité captée par le capteur
     */
    float * humidite;
    /**
     * @brief CO2
     * @details CO2 capté par le capteur
     */
    unsigned int * co2;
}Donnees;


#endif
