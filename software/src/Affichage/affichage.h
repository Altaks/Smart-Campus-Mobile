#ifndef AFFICHAGE_H
#define AFFICHAGE_H

#include <SSD1306Wire.h>
#include "typeDef.h"

/**
 * @brief Initialise l'affichage
 * Initialise l'affichage
 * @return true si l'initialisation s'est bien passée
*/
bool initAffichage();

/**
 * @brief Initialise la tâche d'affichage
 * Initialise la tâche d'affichage
 * @return true si l'initialisation s'est bien passée
*/
xTaskHandle initTacheAffichage(Donnees *);

/**
 * @brief Tâche d'affichage
 * Tâche d'affichage qui affiche les données sur l'écran toutes les 3 secondes en carrousel
*/
[[noreturn]] void taskAffichage(void *pvParameters);

/**
 * @brief Affiche les données sur l'écran
 * Affiche les données sur l'écran
 * @param PAGE Page a afficher
*/
void afficher(PAGE &, Donnees *);

/**
 * \brief Affiche un texte sur l'écran
 * Affiche un texte souhaité sur l'écran avec une taille de police et une position donnée
 * L'écran est effacé avant l'affichage
 * L'écran doit être initialisé avant l'appel de cette fonction
 * \param text le texte à afficher
 * \param x position x du texte
 * \param y position y du texte
 * \param fontSize taille de la police (16, 24, 32) par défaut 16
 * \param centered si le texte doit être centré ou non
 */
void displayText(const String& text, int x = 0, int y = 0, int fontSize = 16, bool centered = false);

void displayResetInfos(const String& dateTime, const String& ip);

#endif
