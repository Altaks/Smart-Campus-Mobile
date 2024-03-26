#include <DNSServer.h>
#include <AsyncTCP.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"

#include "modifierPageWeb.h"
#include "serveurWeb.h"

#include "Fichiers/fichierSPIFFS.h"

#include "Reseaux/station.h"

DNSServer dnsServer;
AsyncWebServer server(80);

void setupServeurWeb()
{
    // Permet de récupérer le fichier main
    server.on("/main.css", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        request->send(SPIFFS, "/main.css", "text/css");
        Serial.println("Page envoyée");
    });

    // Permet d'accéder à la page d'accueil
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /");
        request->send(SPIFFS, "/index.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet d'accéder à la page de configuration de la base de données
    server.on("/config-base-de-donnees", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-base-de-donnees");
        modifierFormPageConfigbd();
        Serial.println("Page modifiée");
        request->send(SPIFFS, "/configbd.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet de récupérer les informations de la base de données et de les enregistrer dans le fichier /infobd.txt
    server.on("/config-base-de-donnees", HTTP_POST, [] (AsyncWebServerRequest *request) 
    {
        Serial.println("Requête recue sur /config-base-de-donnees");
        modifierFormPageReseau();
        
        String nom_sa = ""; 
        String localisation = "";
        String nom_bd = "";
        String nom_utilisateur = "";
        String mot_de_passe = "";
        for(int i=0;i<request->params() ;i++){
            AsyncWebParameter* p = request->getParam(i);
            if(p->name() == "nom_sa"){
                nom_sa = p->value();
            }
            else if(p->name() == "localisation"){
                localisation = p->value();
            } 
            else if(p->name() == "nom_bd"){
                nom_bd = p->value();
            } 
            else if(p->name() == "nom_utilisateur"){
                nom_utilisateur = p->value();
            } 
            else if(p->name() == "mot_de_passe"){
                mot_de_passe = p->value();
            }
        }
        Serial.println("nom_sa: " + nom_sa);
        Serial.println("localisation: " + localisation);
        Serial.println("nom_bd: " + nom_bd);
        Serial.println("nom_utilisateur: " + nom_utilisateur);
        Serial.println("mot_de_passe: " + mot_de_passe);

        ecrireFichier("/infobd.txt",
            "nom_sa:"+nom_sa+
            "\nlocalisation:"+localisation+
            "\nnom_bd:"+nom_bd+
            "\nnom_utilisateur:"+nom_utilisateur+
            "\nmot_de_passe:"+mot_de_passe);

        request->redirect("http://"+getIP()+"/");  
    });

    // Permet d'accéder à la page de configuration du réseau
    server.on("/config-reseau", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-reseau");
        modifierFormPageReseau();
        modifierListeReseauxPageReseau();
        Serial.println("Page modifiée");
        request->send(SPIFFS, "/reseau.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet de récupérer les informations du wifi auquel connecter le SA et de les enregistrer dans le fichier /inforeseau.txt
    server.on("/config-reseau", HTTP_POST, [] (AsyncWebServerRequest *request) 
    {
        Serial.println("Requête recue sur /config-reseau");

        String nom_reseau = "";
        String type_eap = "";
        String nom_utilisateur = "";
        String identifiant = "";
        String mot_de_passe = "";
        for(int i=0;i<request->params() ;i++){
            AsyncWebParameter* p = request->getParam(i);
            if(p->name() == "nom_reseau"){
                nom_reseau = p->value();
            } 
            else if(p->name() == "type_eap"){
                type_eap = p->value();
            } 
            else if(p->name() == "nom_utilisateur"){
                nom_utilisateur = p->value();
            } 
            else if(p->name() == "identifiant"){
                identifiant = p->value();
            }
            else if(p->name() == "mot_de_passe"){
                mot_de_passe = p->value();
            }
        }
        Serial.println("nom_reseau: " + nom_reseau);
        Serial.println("type_eap: " + type_eap);
        Serial.println("nom_utilisateur: " + nom_utilisateur);
        Serial.println("identifiant: " + identifiant);
        Serial.println("mot_de_passe: " + mot_de_passe);

        ecrireFichier("/inforeseau.txt",
            "nom_reseau:"+nom_reseau+
            "\ntype_eap:"+type_eap+
            "\nnom_utilisateur:"+nom_utilisateur+
            "\nidentifiant:"+identifiant+
            "\nmot_de_passe:"+mot_de_passe);


        request->redirect("http://"+getIP()+"/");  
    });

    // Permet de récupérer les informations du point d'accès wifi et de les enregistrer dans le fichier /infoap.txt
    server.on("/config-acces-point", HTTP_POST, [] (AsyncWebServerRequest *request) 
    {
        Serial.println("Requête recue sur /config-acces-point");

        String ssid = "";
        String mot_de_passe = "";
        String mot_de_passe_confirm = "";
        for(int i=0;i<request->params() ;i++){
            AsyncWebParameter* p = request->getParam(i);
            if(p->name() == "ssid"){
                ssid = p->value();
            }
            else if(p->name() == "mot_de_passe"){
                mot_de_passe = p->value();
            } 
            else if(p->name() == "mot_de_passe_confirm"){
                mot_de_passe_confirm = p->value();
            } 
        }
        Serial.println("SSID: " + ssid);
        Serial.println("mot_de_passe: " + mot_de_passe);
        Serial.println("mot_de_passe_confirm: " + mot_de_passe_confirm);

        if(mot_de_passe == mot_de_passe_confirm)
        {
            ecrireFichier("/infoap.txt",
                "nom_ap:"+ssid+
                "\nmot_de_passe:"+mot_de_passe);
            request->redirect("http://"+getIP()+"/"); 
            String nomAP = recupererValeur("/infoap.txt","nom_ap");
            String motDePasseAP = recupererValeur("/infoap.txt","mot_de_passe");
            if(WiFi.getMode() != WIFI_STA) WiFi.softAP(ssid,mot_de_passe);    
        }
        else
        {
            request->redirect("http://"+getIP()+"/config-reseau");
        }
        
    });

    // Permet de renvoyer les requêtes ou la route n'a pas été initialisée vers la page d'accueil
    server.onNotFound ( [](AsyncWebServerRequest *request)
    {
        request->redirect("http://"+getIP()+"/");
    });
}

void setupServeurDNS()
{  
    dnsServer.start(53, "smart-campus.fr", WiFi.softAPIP());
}

void loopServeurDNS()
{
    dnsServer.processNextRequest();
}

[[noreturn]] void taskServeurDNS(__attribute__((unused)) void * parameter){
    while(true){
        loopServeurDNS();
        vTaskDelay(100);
    }
}

void activerServeurDNS()
{
    server.begin();

    delay(100);

    xTaskCreate(
        taskServeurDNS,
        "loopServeurWeb",
        10000,
        nullptr,
        5,
        nullptr
    );
}