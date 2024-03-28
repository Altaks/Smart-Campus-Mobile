//
// Created by Adrien on 20/12/23.
//
#include <Arduino.h>

#include "station.h"

#include "typeDef.h"
#include "Fichiers/fichierSPIFFS.h"
#include "Heure/heureLocal.h"
#include "LED/led.h"

void initReseauStation()
{
    // Pour pouvoir connecter le SA à un WiFi
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    WiFi.begin();
}

String getIP()
{
    return (WiFi.getMode() == WIFI_STA)? WiFi.localIP().toString():WiFi.softAPIP().toString();
}

[[noreturn]] void taskEnregistrerListeReseau(__attribute__((unused)) void * parameter){
    while(true){
        vTaskDelay(10 * 1000);
        enregistrerListeReseaux();
    }
}

xTaskHandle activerEnregistrerListeReseau()
{
    xTaskHandle taskHandle;
    // Active la tache taskConnexionReseau
    xTaskCreate(
        taskEnregistrerListeReseau,
        "Connexion au reseau wifi",
        1000,
        nullptr,
        11,
        &taskHandle
    );

    return taskHandle;
}

void enregistrerListeReseaux()
{
    // scan les réseaux alentours
    int n = WiFi.scanNetworks();
    
    /*
     * Enregistre la liste des réseaux dans la variable listeReseauxDisponiblesStr au format :
     *  nb_reseaux:2
     *  1:reseau1
     *  2:reseau2
    */
    String listeReseauxDisponiblesStr = "nb_reseaux:"+String(n)+"\n";
    if(n > 0)
    {
        for (int i = 0 ; i < n ; i++)
        {
            listeReseauxDisponiblesStr += String(i+1)+ ":" + WiFi.SSID(i) + "\n";
            delay(10);
        }
    }

    ecrireFichier("/listereseaux.txt", listeReseauxDisponiblesStr);
}

bool estConnecte(const String& nomReseau)
{

    return (WiFi.SSID() == nomReseau && WiFi.status() == WL_CONNECTED);
}

bool connexionWifi(const String& ssid, wpa2_auth_method_t methodeAutentification, const String& password, const String& identifiant, const String& nomUtilisateur)
{
    // Réalise la connexion du SA à un réseau en wifi avec le mode de connexion choisi
    switch(methodeAutentification)
    {
        case WPA2_AUTH_PEAP:
            WiFi.begin(ssid, WPA2_AUTH_PEAP, identifiant, nomUtilisateur, password);
            break;
        case WPA2_AUTH_TTLS:
            WiFi.begin(ssid, WPA2_AUTH_TTLS, identifiant, nomUtilisateur, password);
            break;
        case WPA2_AUTH_TLS:
            WiFi.begin(ssid, password);
            break;
    }

    Serial.println("Connexion au réseau "+ssid);
    setLEDColor(0,0,255);
    // Vérifie si le SA se connecte pendant 30 secondes
    // retourne true s'il arrive à se connecter ; false sinon
    for(int counter = 0 ; counter <= 30 && WiFi.status() != WL_CONNECTED ; counter++)
    {
        delay(500);
        Serial.println("Connexion en cours...");
        if(counter >= 30)
        {
            setLEDColor(60,0,255);
            return false;
        }
    }
    Serial.println("Connexion réussie !");
    return true;
}

void disconnect() { 
    WiFi.disconnect(); 
    Serial.println("Deconnexion du Wi-Fi");
    
}