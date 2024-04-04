#include <SPIFFS.h>
#include "Reseaux/station.h"
#include "Fichiers/fichierSPIFFS.h"

#include "modifierPageWeb.h"

void modifierFormPageConfigbd()
{
    String ip = getIP() ;
    modifierFichier("/configbd.html", "<!--DebutFormHead-->", "<!--FinFormHead-->", R"(<form action="/config-base-de-donnees" method="POST">)");
    modifierFichier("/configbd.html","<!--DebutNomSA-->", "<!--FinNomSA-->",R"(<input type="text" name="nom_sa" id="nom_sa" value=")"+recupererValeur("/infobd.txt","nom_sa")+"\">");
    modifierFichier("/configbd.html","<!--DebutLocalisation-->", "<!--FinLocalisation-->",R"(<input type="text" name="localisation" id="localisation" value=")"+recupererValeur("/infobd.txt","localisation")+"\">");
    modifierFichier("/configbd.html","<!--DebutNomBd-->", "<!--FinNomBd-->",R"(<input type="text" name="nom_bd" id="nom_bd" value=")"+recupererValeur("/infobd.txt","nom_bd")+"\">");
    modifierFichier("/configbd.html","<!--DebutNomUtilisateur-->", "<!--FinNomUtilisateur-->",R"(<input type="text" name="nom_utilisateur" id="nom_utilisateur" value=")"+recupererValeur("/infobd.txt","nom_utilisateur")+"\">");
    modifierFichier("/configbd.html","<!--DebutMotDePasse-->", "<!--FinMotDePasse-->",R"(<input type="password" name="mot_de_passe" id="mot_de_passe" value=")"+recupererValeur("/infobd.txt","mot_de_passe")+"\">");
    modifierFichier("/configbd.html","<!--DebutDescription-->", "<!--FinDescription-->",R"(<input type="text" name="description" id="description" value=")"+recupererValeur("/infobd.txt","description")+"\">");
    modifierFichier("/configbd.html","<!--DebutURL-->", "<!--FinURL-->",R"(<input type="text" name="url_api" id="url_api" value=")"+recupererValeur("/infobd.txt","url_api")+"\">");

    String erreur = recupererValeur("/erreurWeb.txt","erreur");
    bool visite = recupererValeur("/erreurWeb.txt","visite").toInt();
    Serial.println("erreur: " + erreur);
    Serial.println("visite: " + String(visite));
    if (erreur == "bd" && visite != 0){
        Serial.println("erreur bd");
        modifierFichier("/configbd.html", "<!--Erreur-->", "<!--FinErreur-->", R"(<div class="erreur" role="alert"><p>La connexion à la base de données doit être paramétrée avant d'activer l'envois des données</p></div>)");
    }
    else{
        Serial.println("pas d'erreur bd");
        modifierFichier("/configbd.html", "<!--Erreur-->", "<!--FinErreur-->", "\n");
    }
    ecrireFichier("/erreurWeb.txt","erreur:" + erreur + "\nvisite:0");
}

void modifierFormPageReseau()
{
    String erreur = recupererValeur("/erreurWeb.txt","erreur");
    bool visite = recupererValeur("/erreurWeb.txt","visite").toInt();
    Serial.println("erreur: " + erreur);
    Serial.println("visite: " + String(visite));
    if (erreur == "wifi" && visite){
        Serial.println("erreur wifi");
        modifierFichier("/configwifi.html", "<!--Erreur-->", "<!--FinErreur-->", R"(<div class="erreur" role="alert"><p>La connexion au réseau wifi doit être paramétrée avant d'activer l'envois des données</p></div>)");
    }
    else{
        Serial.println("pas d'erreur wifi");
        modifierFichier("/configwifi.html", "<!--Erreur-->", "<!--FinErreur-->", "\n");
    }

    modifierFichier("/configwifi.html", "<!--DebutFormHeadReseau-->", "<!--FinFormHeadReseau-->", R"(<form action="/config-wifi" method="POST">)");

    ecrireFichier("/erreurWeb.txt","erreur:" + erreur + "\nvisite:0");
}

void modifierFormPageConfigAP(){
    modifierFichier("/configap.html", "<!--DebutFormHeadAp-->", "<!--FinFormHeadAp-->", R"(<form action="/config-access-point" method="POST">)");
}


void modifierListeReseauxPageReseau()
{
    int n = recupererValeur("/listereseaux.txt","nb_reseaux").toInt();
    String contenu = "";
    String ssid;
    for(int i = 1 ; i <= n ; i++)
    {
        ssid = recupererValeur("/listereseaux.txt",String(i));
        contenu += "<option value=\"" + ssid + "\">" + ssid + "</option>";
    }
    modifierFichier("/configwifi.html", "<!--ListeReseaux-->", "<!--FinListeReseaux-->", contenu);
    Serial.println("configwifi.html liste des reseaux diponibles modifiée");
}