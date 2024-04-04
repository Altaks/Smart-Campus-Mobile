//
// Created by Adrien on 20/12/23.
//

#ifndef POINTACCES_H
#define POINTACCES_H

// Inclusion des librairies principales
#include <WString.h>

/**
 * @brief Fonction permettant d'initialiser le réseau wifi
 * @details Cette fonction permet d'initialiser le réseau wifi en créant un point d'accès wifi
 */
void initReseauStationEtPointAcces();

/**
 * @brief Crée un point d'accès wifi
 * @param nom_ap nom du point d'accès
 * @param mot_de_passe mot de passe du point d'accès. Il doit faire au moins 8 caractères et au plus 63 caractères
 */
void creerPointAcces(const String& nom_ap, const String& mot_de_passe);
#endif

