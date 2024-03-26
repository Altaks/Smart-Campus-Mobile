#include <Arduino.h>

#include "typeDef.h"

#include "Affichage/affichage.h"

#include "Capteurs/tempEtHum.h"
#include "Capteurs/qualAir.h"
#include "Capteurs/presence.h"

#include "envois/envois.h"

#include "Fichiers/fichierSPIFFS.h"

#include "Heure/heureLocal.h"

#include "Reseaux/pointAcces.h"
#include "Reseaux/station.h"

#include "Serveur/serveurWeb.h"
#include "Serveur/modifierPageWeb.h"

#include "LED/led.h"

Donnees * donnees;

void setup() {

    Serial.begin(9600);
    while(!Serial);

    // LED
    initLED();

    delay(1000);
    // Initilaisation système de fichier
    initSystemeFichier();
    
    delay(100);
    // Récupère les informations du point d'accès 
    String nomAP = recupererValeur("/infoap.txt","nom_ap");
    String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");

    // Initialisation reseau en mode STATION et POINT D'ACCES
    initReseauStationEtPointAcces();
    creerPointAcces(nomAP,motDePasseAP);

    //Initialise le serveur web et le serveur DNS
    // setupServeurWeb();
    // setupServeurDNS();
    // activerServeurDNS();

    delay(100);

    //Initialise l'affichage
    bool affiche = initAffichage(); 
    
    //Affichage du nom de l'AP et de l'adresse IP a utilisé
    displayText("Nom du Wifi : \n" + nomAP+"\nIP : "+getIP(),0,10);

    String nomReseau;

    Serial.println("Connexion au reseau wifi");

    // Tant que le SA n'est pas connecté à internet
    do
    {
        // Enregistre la liste des réseaux dans le fichier listereseaux.txt
        enregistrerListeReseaux();

        nomReseau = recupererValeur("/inforeseau.txt","nom_reseau");

        // si le nom du réseau auquel se connecter est configuré
        // et que le réseau auquel se connecter est capté par le SA (enregistrer dans le fichier listereseaux.txt)
        if (!nomReseau.isEmpty() 
            && estDansFichier("/listereseaux.txt",nomReseau)) 
        {
            // Récupère les valeurs dans le fichier inforeseau.txt
            int type_eap          = recupererValeur("/inforeseau.txt","type_eap").toInt();
            String password       = recupererValeur("/inforeseau.txt","mot_de_passe");
            String identifiant    = recupererValeur("/inforeseau.txt","identifiant");
            String nomUtilisateur = recupererValeur("/inforeseau.txt","nom_utilisateur");
            
            // Essaie de se connecter au réseau
            if(connexionWifi(nomReseau, wpa2_auth_method_t(type_eap), password ,identifiant, nomUtilisateur))
            {
                Serial.println("Connexion a "+nomReseau+" Reussie");
            }
            else
            {
                Serial.println("Echec de la connexion a "+nomReseau);
                ecrireFichier("/inforeseau.txt",
                    "nom_reseau:\ntype_eap:\nnom_utilisateur:\nidentifiant:\nmot_de_passe:");
            }
        }
        delay(10000);
    }
    while(!estConnecte(nomReseau));
    
    // Initialise l'heure (peut prendre quelques secondes avant de se connecter au serveur ntp)
    initHeure();
    Serial.print("Initialisation de la date en cours");
    displayText("Initialisation de la\ndate en cours...");

    while (!dateEstInitialisee())
    {
        Serial.print(".");
        delay(250);
    }
    Serial.println();
    
    // Désactive le point d'accès wifi (le serveur reste disponible en se connectant au même routeur)
    initReseauStation();

    // Affiche le contenu des fichiers contenant les informations a conservé dans le SA
    afficherContenuFichier("/infoap.txt");
    afficherContenuFichier("/infobd.txt");
    afficherContenuFichier("/inforeseau.txt");
    afficherContenuFichier("/listereseau.txt");

    // Active l'enregistrement périodique des réseaux wifi détectés par l'ESP dans le fichier /listereseaux.txt
    // activerEnregistrerListeReseau();

    donnees = new Donnees();
    donnees->humidite = new float(-1);
    donnees->temperature = new float(-1);
    donnees->co2 = new unsigned int(0);

    // Initialise les capteurs
    initTaskTempEtHum(donnees);
    initTaskQualAir(donnees);
    initPresence();

    // Active l'affichage carrousel  
    if (affiche) {initTacheAffichage(donnees);}

    // Initialise la tâche de la LED
    bool led = initTaskLED(donnees);

    // Initialise l'envoi des données
    bool envoie = initEnvois(donnees);

}

void loop() 
{    
    delay(60 * 1000);
}