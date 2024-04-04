#ifndef MODIFIERPAGEWEB_H
#define MODIFIERPAGEWEB_H
#include <WString.h>

/**
 * @brief Fonction permettant de modifier le contenu de la page web de la configuration de la base de données
 * @details Cette fonction permet de modifier le contenu de la page web de la configuration de la base de données en ajoutant les valeurs actuelles des paramètres de la base de données
 * et en ajoutant un message d'erreur si la connexion à la base de données n'est pas configurée
 */
void modifierFormPageConfigbd();

/**
 * @brief Fonction permettant de modifier le contenu de la page web de la configuration du réseau wifi
 * @details Cette fonction permet de modifier le contenu de la page web de la configuration du réseau wifi en ajoutant l'action du formulaire et en ajoutant un message d'erreur si la connexion au réseau wifi n'est pas configurée
 */
void modifierFormPageReseau();

/**
 * @brief Fonction permettant de modifier le contenu de la page web de la configuration du point d'accès
 * @details Cette fonction permet de modifier le contenu de la page web de la configuration du point d'accès en ajoutant l'action du formulaire
 */
void modifierFormPageConfigAP();

/**
 * @brief Fonction permettant de modifier la liste des réseaux wifi disponibles dans la page de configuration du réseau wifi
 * @details Cette fonction permet de modifier la liste des réseaux wifi disponibles dans la page de configuration du réseau wifi en ajoutant les réseaux wifi captés par le SA
 * dans la liste déroulante
 */
void modifierListeReseauxPageReseau();

#endif