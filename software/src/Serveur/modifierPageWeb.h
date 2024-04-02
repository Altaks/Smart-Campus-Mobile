#ifndef MODIFIERPAGEWEB_H
#define MODIFIERPAGEWEB_H
#include <WString.h>

/**
 * Change les entêtes du formulaire du fichier /configbd.html
*/
void modifierFormPageConfigbd();

/**
 * Change les entêtes des formulaires du fichier /configwifi.html
*/
void modifierFormPageReseau();

/**
 * Change les entêtes du formulaire du fichier /configap.html
*/
void modifierFormPageConfigAP();

/**
 * Ajoute les réseau alentour au select du fichier /reseau.html
*/
void modifierListeReseauxPageReseau();

#endif