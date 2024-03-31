//
// Created by Adrien on 20/12/23.
//

#ifndef SOFTWARE_HEURELOCAL_H
#define SOFTWARE_HEURELOCAL_H

// Inclusion des librairies principales
#include <WString.h>

/**
 * Initialise l'heure grâce au serveur ntp 0.europe.pool.ntp.org
 * /!\ Nécessite une connexion a internet /!\
*/
void initHeure();  

/**
 * Permet de savoir si la date a été initialisée
 * @return true si la date est initialisée | false sinon
*/
bool dateEstInitialisee();

/**
 * Permet de récupérer la date actuelle
 * @return la date actuelle au format "YYYY-MM-DD hh:mm:ss" || "Date Error" si la date n'est pas accessible
*/
String getDate(); 

/**
 * Permet de récupérer l'année en cours
 * @return l'année en cours en tant qu'entier || -1 si la date n'est pas accessible
*/
short getAnnee();

/**
 * Permet de récupérer le numéro du mois en cours avec janvier == 1 et décembre == 12
 * @return le mois en cours en tant qu'entier || -1 si la date n'est pas accessible
*/
short getMois();

/**
 * Permet de récupérer le jour en cours
 * @return le jour en cours en entier || -1 si la date n'est pas accessible
*/
short getJour();

/**
 * Permet de récupérer l'heure en cours en entier
 * @return l'heure en cours || -1 si la date n'est pas accessible
*/
short getHeure(); 

/**
 * Permet de récupérer la minute en cours en entier
 * @return La minute en cours || -1 si la date n'est pas accessible
*/
short getMinute();


void setInitialisationDate(bool);

bool dateEnInitialisation();

#endif //SOFTWARE_HEURELOCAL_H
