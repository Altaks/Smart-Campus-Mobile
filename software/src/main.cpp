#include <Arduino.h>
#include <SPIFFS.h>
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
#include "Boutons/boutons.h"
#include "Veille/veille.h"

/**
 * @brief Variable contenant les données à envoyer
 * @details Cette variable est utilisée pour stocker les données à envoyer et à afficher
 */
Donnees * donnees;

/**
 * @brief Fonction permettant de se connecter à un réseau wifi
 * @details Cette fonction permet de se connecter à un réseau wifi choisi lors du mode configuration avec un nom de réseau, un type de sécurité, un mot de passe, un identifiant et un nom d'utilisateur
 * @return true si la connexion est réussie | false sinon
 */
bool connexionWifi() {
    String nomReseau;

    Serial.println("Connexion au reseau wifi");

    unsigned short attempt = 0;

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
        attempt ++;
        Serial.println("Tentative de connexion n°"+String(attempt));
    }
    while(!estConnecte(nomReseau) && attempt < 1);

    Serial.printf("Connexion au réseau %s : %s\n", nomReseau.c_str(), estConnecte(nomReseau) ? "OK" : "KO");

    return WiFiClass::status() == WL_CONNECTED;
}

/**
 * @brief Fonction setup
 * @details Cette fonction est appelée une seule fois au démarrage du programme
 */
void setup() {

    // Initialisation de la communication série avec le moniteur série
    Serial.begin(9600);
    while(!Serial);

    // Initialisation de la led
    initLED();

    delay(1000);
    // Initialisation du système de fichier afin de pouvoir lire et écrire dans la mémoire flash
    initSystemeFichier();
    
    delay(100);
    //Initialise l'affichage afin de pouvoir afficher des informations
    initAffichage();

    delay(100);

    // Initialisation de la structure de données contenant les informations à envoyer et à afficher
    donnees = new Donnees();
    donnees->humidite = new float(-1);
    donnees->temperature = new float(-1);
    donnees->co2 = new unsigned int(0);

    // Initialise la structure de données pour le changement de mode
    setDonnees(donnees);


    String nomReseauWifi = recupererValeur("/inforeseau.txt","nom_reseau");
    Serial.println("Nom du réseau wifi : "+nomReseauWifi);

    // Si le nom du réseau wifi n'est pas configuré ou que le SA n'est pas connecté à internet
    if (nomReseauWifi.isEmpty() || !connexionWifi())
    {
        Serial.println("Mode configuration");
        enregistrerListeReseaux();
        initBoutons(CONFIGURATION);

        delay(100);

        String nomAP = recupererValeur("/infoap.txt","nom_ap");
        String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");

        // Initialisation reseau en mode STATION et POINT D'ACCES
        initReseauStationEtPointAcces();

        xTaskHandle serveurTaskHandle = activerServeurDNS();
        setServeurTaskHandle(serveurTaskHandle);

        delay(100);

        //Affichage du nom de l'AP et de l'adresse IP a utilisé
        displayText("Nom du Wifi : \n" + nomAP+"\nIP : "+getIP(),0,10);
    }
    else
    {
        Serial.println("Mode mesure");
        initBoutons(MESURE);
    }

    // attend d'être connecté à internet
    // si on est en mode de configuration, on attend que le SA soit connecté à internet
    // sinon la connexion est déjà établie
    while((WiFiClass::status() != WL_CONNECTED)){
        Serial.print(".");
        delay(1000);
    }
    Serial.println("Connecté à internet");
    
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
    setInitialisationDate(false);
    
    // Désactive le point d'accès wifi (le serveur reste disponible en se connectant au même routeur)
    initReseauStation();

    // Affiche le contenu des fichiers contenant les informations a conservé dans le SA
    afficherContenuFichier("/infoap.txt");
    afficherContenuFichier("/infobd.txt");
    afficherContenuFichier("/inforeseau.txt");
    afficherContenuFichier("/listereseaux.txt");

    // Active l'enregistrement périodique des réseaux wifi détectés par l'ESP dans le fichier /listereseaux.txt
    // activerEnregistrerListeReseau();
    
    // Initialise les capteurs
    xTaskHandle tempEtHumTaskHandle = initTaskTempEtHum(donnees);
    setTempEtHumTaskHandle(tempEtHumTaskHandle);

    xTaskHandle qualAirTaskHandle = initTaskQualAir(donnees);
    setQualAirTaskHandle(qualAirTaskHandle);
    //initPresence();

    // Active l'affichage carrousel  
    xTaskHandle affichageTaskHandle = initTacheAffichage(donnees);
    setAffichageTaskHandle(affichageTaskHandle);

    // Initialise la tâche de la LED
    xTaskHandle ledTaskHandle = initTaskLED(donnees);
    setLedTaskHandle(ledTaskHandle);

    // Initialise l'envoi des données
    xTaskHandle envoisTaskhandle = initEnvois(donnees);
    setEnvoisTaskHandle(envoisTaskhandle);

    // Initialise la veille de nuit.
    time_t maintenant = time(nullptr);
    struct tm timeinfo {};
    localtime_r(&maintenant, &timeinfo);

    timeinfo.tm_hour = 20;
    timeinfo.tm_min = 0;
    timeinfo.tm_sec = 0;

    miseEnVeilleNuit(timeinfo, 11ull * 3600ull * 1000ull * 1000ull);
}

/**
 * @brief Fonction loop
 * @details Cette fonction est appelée en boucle après la fonction setup
 */
void loop() {
    delay(30 * 1000);
    Serial.printf("Mémoire disponible : %i | %i\n", esp_get_free_internal_heap_size(), esp_get_free_heap_size());
    Serial.println("Mémoire totale : " + String(ESP.getHeapSize()));
}