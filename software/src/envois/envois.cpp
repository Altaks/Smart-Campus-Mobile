#include "envois.h"

#include <Boutons/boutons.h>

#include "WiFi.h"

#include "Fichiers/fichierSPIFFS.h"
#include "Capteurs/presence.h"
#include "Capteurs/tempEtHum.h"
#include "Capteurs/qualAir.h"
#include "LED/led.h"

bool etatEnvois = false;
bool tacheEnCours = false;


// Décommenter/Commenter les Serial.println pour voir/ne pas voir les informations de debug en usb

void taskEnvois(void *pvParameters){
    tacheEnCours = true;

    while(getMode() == MESURE){
        unsigned short i = 0; // wait 30 secondes
        while(getMode() == MESURE && i < 30){
            vTaskDelay(pdMS_TO_TICKS(1000));
            i++;
        }
        if (getMode() != MESURE){
            Serial.println("Sortie de la tâche d'envoi avant envoi des données");
            break;
        }
        vTaskDelay(pdMS_TO_TICKS(30 * 1000));
        Serial.println("______________________________________");
        Serial.println("Debut de l'envoi des données :");
        Serial.println("______________________________________");
        int codeRetour = envoyer(static_cast<Donnees *>(pvParameters));
        if (codeRetour == 0){
            Serial.println("Donnees envoyees");
            setEnvoieState(true);
        }
        else{
            Serial.println("Erreur lors de l'envoi des donnees");
            Serial.println("Code d'erreur : " + String(codeRetour) + " : " + erreurToString(codeRetour));
            setEnvoieState(false);
        }
        Serial.println("______________________________________");

        i = 0; // left 4min and 28s
        while(getMode() == MESURE && i < 4 * 60 + 28){
            vTaskDelay(pdMS_TO_TICKS(2000));
            i+=2;
        }
    }
    tacheEnCours = false;
    vTaskDelete(nullptr);
}

xTaskHandle initEnvois(Donnees * donnees){

    xTaskHandle envoisTaskHandle;

    xTaskCreate( //création de la tâche
      taskEnvois,
      "Envois des donnees sur l'api",
      10000,
      donnees,
      2,
      &envoisTaskHandle
    );

    return envoisTaskHandle;
}

int envoyer(Donnees *donnees){
    
    Serial.println("Vérification de la connexion au réseau");
    // verification de la connexion au réseau
    if (WiFi.status() != WL_CONNECTED){
        abort(); // redemarre l'esp pour se reconnecter au réseau
    }

    Serial.println("Obtention de la date");
    String date = getDate();

    // vérification de la date
    if (date == "Date Error"){
        return -1;
    }

    char s_donnees[4][6];

    Serial.println("Formatage des données récupérées");
    
    // recupérer les données
    // si une donnée n'est pas disponible, on met une chaine de caractère vide
    *donnees->temperature == -1 ? sprintf(s_donnees[0], "%c", EOF) : sprintf(s_donnees[0], "%.1f", *donnees->temperature); //donnees->tempEtHum->temperature); // %2.f pour  2 chiffres après la virgule
    *donnees->humidite == -1 ? sprintf(s_donnees[1], "%c", EOF) : sprintf(s_donnees[1], "%.1f", *donnees->humidite); //donnees->tempEtHum->humidite); // %2.f pour avoir 2 chiffres après la virgule
    *donnees->co2 == 0 ? sprintf(s_donnees[2], "%c", EOF) : sprintf(s_donnees[2], "%hu", *donnees->co2); //*donnees->co2); // %hu pour avoir un unsigned short

    // presence est un booléen, on le convertit en string
    sprintf(s_donnees[3], getPresence() ? "true" : "false");

    Serial.println("Création du client");

    Serial.printf("Mémoire disponible avant création client HTTP : %i | %i\n", esp_get_free_internal_heap_size(), esp_get_free_heap_size());

    // création du client http pour envoyer les données
    HTTPClient http;

    Serial.printf("Mémoire disponible après création client : %i | %i\n", esp_get_free_internal_heap_size(), esp_get_free_heap_size());


    // requete POST basée sur l'exemple de l'api suivant :
    /*
    curl -X 'POST' \
    'https://sae34.k8s.iut-larochelle.fr/api/captures' \
    -H 'accept: application/ld+json' \
    -H 'dbname: sae34bdm2eq3' \
    -H 'username: m2eq3' \
    -H 'userpass: <pwd>' \
    -H 'Content-Type: application/json' \
    -d '{
    "nom": "<nom>",
    "valeur": "<valeur>",
    "dateCapture": "<dateCapture>",
    "localisation": "<localisation>",
    "description": "",
    "nomsa": "<nomsa>"
    }'
    */    

    // Décommenter pour avoir les données de connexion à l'api
    // Serial.println("Donnees de connexion :");
    // Serial.println(recupererValeur("/infobd.txt","nom_bd").c_str());
    // Serial.println(recupererValeur("/infobd.txt","nom_utilisateur").c_str());
    // Serial.println(recupererValeur("/infobd.txt","mot_de_passe").c_str());

    Serial.println("Connexion au serveur d'API");

    // configure la connexion au serveur d'api (changer l'url si besoin)
    String urlAPI = recupererValeur("/infobd.txt", "url_api");
    Serial.printf("URL de l'API : %s [%i]\n", urlAPI.c_str(), strlen(urlAPI.c_str()));

    etatEnvois = true;
    http.begin(urlAPI);

    Serial.println("Création du header de la requête");

    String nomSA          = recupererValeur("/infobd.txt","nom_sa");
    String nomBd          = recupererValeur("/infobd.txt","nom_bd");
    String nomUtilisateur = recupererValeur("/infobd.txt","nom_utilisateur");
    String motDePasse     = recupererValeur("/infobd.txt","mot_de_passe");

    if(nomSA.isEmpty() || nomUtilisateur.isEmpty() || motDePasse.isEmpty() || nomSA.isEmpty()){
        return -2;
    }

    Serial.printf("Nom SA : '%s'\n", nomSA.c_str());
    Serial.printf("Nom BD : '%s'\n", nomBd.c_str());
    Serial.printf("Nom Utilisateur : '%s'\n", nomUtilisateur.c_str());
    Serial.printf("Nom Mot de passe : '%s'\n", motDePasse.c_str());

    // configure le header de la requete
    http.addHeader("accept", "application/ld+json");
    http.addHeader("dbname", nomBd);
    http.addHeader("username", nomUtilisateur);
    http.addHeader("userpass", motDePasse);
    http.addHeader("Content-Type", "application/json");

    Serial.println("Envoi de chaque donnée");

    int codeErreur = 0;

    for(unsigned short i = 0; i < 4; i++){

        Serial.printf("Récupération des données de %s\n", nomsValeurs[i].c_str());

        while(strlen(s_donnees[i]) == 1 && i < 3){
            i++;
            Serial.printf("Erreur lors de la récupération des données.\nRécupération des données de %s\n", nomsValeurs[i].c_str());
        }

        String description = recupererValeur("/infobd.txt", "description");
        if(description == "-1") description = "";

        // Création de la chaine de caractère à envoyer
        const String donneesAEnvoyerStr = R"({"nom":")"+ nomsValeurs[i] +
                                    R"(","valeur":")"+ s_donnees[i] +
                                    R"(","dateCapture":")"+ date +
                                    R"(","localisation":")"+ recupererValeur("/infobd.txt", "localisation").c_str() +
                                    R"(","description":")"+ description.c_str() +
                                    R"(","nomsa":")"+ recupererValeur("/infobd.txt", "nom_sa").c_str() +
                                    "\"}";

        Serial.printf("%s\n", donneesAEnvoyerStr.c_str());

        Serial.printf("Envoi des données de %s\n", nomsValeurs[i].c_str());

        // Décommenter pour avoir la donnée envoyée à l'api
        // Serial.println(donneesAEnvoyerStr);

        // Décommenter pour voir la mémoire libre sur l'esp
        Serial.printf("Mémoire disponible avant envoi : %i | %i\n", esp_get_free_internal_heap_size(), esp_get_free_heap_size());

        // Envoie des données
        int codeReponse = http.POST(donneesAEnvoyerStr);
        Serial.printf("Mémoire disponible après envoi : %i | %i\n", esp_get_free_internal_heap_size(), esp_get_free_heap_size());


        // affiche le code de reponse
        if (HTTPClient::errorToString(codeReponse) != ""){
            Serial.println("Code de réponse : " + String(codeReponse) + " : " + HTTPClient::errorToString(codeReponse));
        }
        else{
            Serial.println("Code de réponse : " + String(codeReponse));
        }

        if (codeReponse != 201){
            codeErreur = -4;
        }
    }

    // howjoc-dyjhId-hiwre0
    
    // libère les ressources
    http.end();
    etatEnvois = false;

    return codeErreur;
}

String erreurToString(int code){

    switch (code)
    {
    case -1:
        return "Erreur de date";
    case -2:
        return "Erreur lors de la récupération des données de connexion à la base de données";
    case -3:
        return "Données non disponibles";
    case -4:
        return "Erreur lors de l'envoi des données (requête http)";
    default:
        return "Erreur inconnue";
    }
}

bool envoieEnCours(){
    return etatEnvois;
}

bool tacheEnvoisEnCours(){
    return tacheEnCours;
}