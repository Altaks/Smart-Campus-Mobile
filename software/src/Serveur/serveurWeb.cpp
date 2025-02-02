#include <DNSServer.h>
#include <AsyncTCP.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"

#include "modifierPageWeb.h"
#include "serveurWeb.h"

#include <Boutons/boutons.h>

#include "Fichiers/fichierSPIFFS.h"

#include "Reseaux/station.h"

DNSServer * dnsServer;
AsyncWebServer * server;
bool etatServeur = false;

void setupServeurWeb()
{
    // Permet de récupérer le fichier main
    server->on("/main.css", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        request->send(SPIFFS, "/main.css", "text/css");
        Serial.println("Page envoyée");
    });

    // Permet d'accéder à la page d'accueil
    server->on("/", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /");
        request->send(SPIFFS, "/index.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet d'accéder à la page de configuration de la base de données
    server->on("/config-base-de-donnees", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-base-de-donnees");
        modifierFormPageConfigbd();
        Serial.println("Page modifiée");
        request->send(SPIFFS, "/configbd.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet de récupérer les informations de la base de données et de les enregistrer dans le fichier /infobd.txt
    server->on("/config-base-de-donnees", HTTP_POST, [] (AsyncWebServerRequest *request) 
    {
        Serial.println("Requête recue sur /config-base-de-donnees");
        modifierFormPageReseau();
        
        String nom_sa = ""; 
        String localisation = "";
        String nom_bd = "";
        String nom_utilisateur = "";
        String mot_de_passe = "";
        String description = "";
        String urlAPI = "";
        for(int i=0;i<request->params() ;i++){
            AsyncWebParameter* p = request->getParam(i);
            if(p->name() == "nom_sa"){
                nom_sa = p->value();
            }
            else if(p->name() == "url_api"){
                urlAPI = p->value();
            }
            else if(p->name() == "localisation"){
                localisation = p->value();
            } else if(p->name() == "description"){
                description = p->value();
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
        Serial.println("description: " + description);
        Serial.println("nom_bd: " + nom_bd);
        Serial.println("nom_utilisateur: " + nom_utilisateur);
        Serial.println("mot_de_passe: " + mot_de_passe);
        Serial.println("url_api: " + urlAPI);

        ecrireFichier("/infobd.txt",
            "nom_sa:"+nom_sa+
            "\nlocalisation:"+localisation+
            "\ndescription:"+description+
            "\nnom_bd:"+nom_bd+
            "\nnom_utilisateur:"+nom_utilisateur+
            "\nmot_de_passe:"+mot_de_passe+
            "\nurl_api:"+urlAPI);

        request->redirect("http://"+getIP()+"/");  
    });

    // Permet d'accéder à la page de configuration du réseau
    server->on("/config-wifi", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-wifi");
        modifierFormPageReseau();
        modifierListeReseauxPageReseau();
        Serial.println("Page modifiée");
        request->send(SPIFFS, "/configwifi.html","text/html");
        Serial.println("Page envoyée");
    });

    // Permet de récupérer les informations du wifi auquel connecter le SA et de les enregistrer dans le fichier /inforeseau.txt
    server->on("/config-wifi", HTTP_POST, [] (AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-wifi");

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

        ecrireFichier("/inforeseau.txt",
            "nom_reseau:"+nom_reseau+
            "\ntype_eap:"+type_eap+
            "\nnom_utilisateur:"+nom_utilisateur+
            "\nidentifiant:"+identifiant+
            "\nmot_de_passe:"+mot_de_passe);


        request->redirect("http://"+getIP()+"/");  
    });

    // Permet de récupérer les informations du point d'accès wifi et de les enregistrer dans le fichier /infoap.txt
    server->on("/config-access-point", HTTP_POST, [] (AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-access-point");

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

    server->on("/config-access-point", HTTP_GET, [](AsyncWebServerRequest *request)
    {
        Serial.println("Requête recue sur /config-acces-point");
        modifierFormPageConfigAP();
        request->send(SPIFFS, "/configap.html","text/html");
        Serial.println("Page envoyée");
    });

    server->on("/", HTTP_POST, [](AsyncWebServerRequest *request)
    {
        // recupere les infos donnees
        String ssid = recupererValeur("/inforeseau.txt","nom_reseau");
        String type_eap = recupererValeur("/inforeseau.txt","type_eap");
        String nom_utilisateur = recupererValeur("/inforeseau.txt","nom_utilisateur");
        String identifiant = recupererValeur("/inforeseau.txt","identifiant");
        String mot_de_passe = recupererValeur("/inforeseau.txt","mot_de_passe");
        if (ssid == "" || type_eap == "" || mot_de_passe == ""){

            // redirect with error message on the page
            ecrireFichier("/erreurWeb.txt","erreur:wifi\nvisite:1");
            request->redirect("http://"+getIP()+"/config-wifi");
            Serial.println("Tentative de passage en mode d'envoi de données sans configuration du réseau");
            Serial.println("Redirection vers la page de configuration du réseau");
            return;
        }
        if ((type_eap == "ttls" || type_eap == "peap") && (identifiant == "" || nom_utilisateur == "")){
            ecrireFichier("/erreurWeb.txt","erreur:wifi");
            request->redirect("http://"+getIP()+"/config-wifi");
            Serial.println("Tentative de passage en mode d'envoi de données sans configuration du réseau");
            Serial.println("Redirection vers la page de configuration du réseau");
            return;
        }

        // recupere les infos de la base de donneesù
        String nom_sa = recupererValeur("/infobd.txt","nom_sa");
        String localisation = recupererValeur("/infobd.txt","localisation");
        String nom_bd = recupererValeur("/infobd.txt","nom_bd");
        String nom_utilisateur_bd = recupererValeur("/infobd.txt","nom_utilisateur");
        String mot_de_passe_bd = recupererValeur("/infobd.txt","mot_de_passe");

        if (nom_sa == "" || localisation == "" || nom_bd == "" || nom_utilisateur_bd == "" || mot_de_passe_bd == ""){
            ecrireFichier("/erreurWeb.txt","erreur:bd\nvisite:1");
            request->redirect("http://"+getIP()+"/config-base-de-donnees");
            Serial.println("Tentative de passage en mode d'envoi de données sans configuration de la base de données");
            Serial.println("Redirection vers la page de configuration de la base de données");
            return;
        }

        ecrireFichier("/erreurWeb.txt","erreur:aucune");

        setMode(Mode::MESURE);

    });

    // Permet de renvoyer les requêtes ou la route n'a pas été initialisée vers la page d'accueil
    server->onNotFound ( [](AsyncWebServerRequest *request)
    {
        request->redirect("http://"+getIP()+"/");
    });
}

void setupServeurDNS()
{  
    dnsServer->start(53, "smart-campus.fr", WiFi.softAPIP());
}

void loopServeurDNS()
{
    dnsServer->processNextRequest();
}

void taskServeurDNS(void * parameter){
    etatServeur = true;
    while(getMode() == CONFIGURATION){
        loopServeurDNS();
        vTaskDelay(100);
    }
    server->end();
    dnsServer->stop();
    delete server;
    delete dnsServer;
    etatServeur = false;
    vTaskDelete(nullptr);
}

xTaskHandle activerServeurDNS()
{
    server = new AsyncWebServer(80);
    dnsServer = new DNSServer();
    
    setupServeurWeb();
    setupServeurDNS();
    server->begin();

    delay(100);

    xTaskHandle serveurTaskHandle;

    xTaskCreate(
        taskServeurDNS,
        "loopServeurWeb",
        1000,
        nullptr,
        5,
        &serveurTaskHandle
    );

    return serveurTaskHandle;
}

bool serveurEnCours()
{
    return etatServeur;
}