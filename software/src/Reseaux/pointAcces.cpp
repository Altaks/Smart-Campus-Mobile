#include <WiFi.h>
#include "pointAcces.h"

void initReseauStationEtPointAcces()
{
    // Pour pouvoir créer un point d'accès et connecter le SA a un WiFi
    WiFi.mode(WIFI_AP_STA);
    WiFi.disconnect();
}

void creerPointAcces(const String& nom_ap, const String& mot_de_passe)
{
    // Cré le point d'accès avec les informations données
    WiFi.softAP(nom_ap,mot_de_passe);      
 
    Serial.print("[+] AP Created with IP Gateway ");
    Serial.println(WiFi.softAPIP());
}