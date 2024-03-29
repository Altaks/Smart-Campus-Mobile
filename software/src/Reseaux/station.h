//
// Created by Adrien on 20/12/23.
//

#ifndef SOFTWARE_STATION_H
#define SOFTWARE_STATION_H

// Inclusion des librairies principales
#include <WString.h>
#include <WiFi.h>

/**
 * Initialise les paramètres wifi en mode station
 */
void initReseauStation();

/**
 * Permet de récupérer l'adresse IP du SA
 * @return l'adresse IP du SA sur le réseau
*/
String getIP();

/**
 *  Permet d'enregistrer la liste des réseaux dans le fichier listereseaux.txt
 *  la première ligne correspond au nombre de réseaux
 *  les autres lignes contiennent les réseaux
 *  exemple du fichier listereseaux.txt :
 *  nb_reseaux:2
 *  1:reseau1
 *  2:reseau2
*/
void enregistrerListeReseaux();

/**
 * Vérifie si l'ESP est connecté a un réseau
 * @return true si est connecté
*/
bool estConnecte(const String& nomReseau);

/**
 * Connecte l'ESP a un réseau
 * @return true si connexion réussie
 */
bool connexionWifi(const String& ssid, wpa2_auth_method_t methodeAutentification = WPA2_AUTH_TLS, const String& password = "", const String& identifiant = "", const String& nomUtilisateur = "");

void disconnect();

bool tacheListeReseauEnCours();

#endif //SOFTWARE_STATION_H
