#include "affichage.h"

#include "typeDef.h"
#include "Capteurs/qualAir.h"
#include "Capteurs/tempEtHum.h"
#include "Heure/heureLocal.h"
#include "Reseaux/station.h"

SSD1306Wire * display;

int carrouselDelay = 3000;
int flicker = 6;

bool initAffichage()
{
    Serial.println("______________________________________");
    Serial.println("Début de l'initialisation de l'écran :");
    Serial.println("______________________________________");

    Serial.println("Définition de la variable de l'écran ...");
    display = new SSD1306Wire(0x3c, SDA, SCL);
    Serial.println("Variable de l'écran définie.");

    Serial.println("Initialisation de la variable ...");
    if (!display->init()) {
        Serial.println("Erreur lors de l'initialisation de la variable ...");
        return false;
    }

    Serial.println("Paramétrage de l'affichage ...");
    display->setFont(ArialMT_Plain_16);
    display->setTextAlignment(TEXT_ALIGN_LEFT);

    Serial.println("Variable initialisée.");
    Serial.println("Ecran initialise.");
    Serial.println("______________________________________");

    return true;
}

xTaskHandle initTacheAffichage(Donnees *donnees)
{
    xTaskHandle affichageTaskHandle;
    xTaskCreate( //création de la tâche
      taskAffichage,
      "Affichage des données en local",
      2000,
      (void *) donnees,
      1,
        &affichageTaskHandle
    );

    return affichageTaskHandle;
}

void afficher(PAGE &page, const Donnees *releves){


    // selectionne la police d'écriture
    display->setFont(ArialMT_Plain_16);

    // affichage de la date et de l'heure
    String dateTime;
    String ip = getIP();
  
    if (getDate() == "Date Error"){
        dateTime = "Erreur de date";
        Serial.println("Erreur lors de la récupération de la date pour l'affichage");
    }
    else {
        dateTime = String(getJour()) + "/" + String(getMois()) + "/" + String(getAnnee()) + " " + String(getHeure()) + ":" + String(getMinute());
    }

    for(int carrousel=0; carrousel<3; carrousel++)
    {
        float donnees;
        String donneesString;
        const char* format;
        
        // affichage des données
        switch (page) {
            case TEMPERATURE :
                donneesString = "Temp :";
                donnees = (float) *releves->temperature;
                format = "%s %.1f°C";
                page = HUMIDITE;
                break;
            case HUMIDITE :
                donneesString = "Hum :";
                donnees = (float) *releves->humidite;
                format = "%s %.1f%%";
                page = CO2;
                break;
            case CO2 :
                donneesString = "CO2 :";
                donnees = *releves->co2;
                if (*releves->co2 == 0) {
                    donnees = -1;
                }
                format = "%s %.0fppm";
                page = TEMPERATURE;
                break;
        }

        if (donnees != -1) {
            char temp[20];
            sprintf(temp, format, donneesString.c_str(), donnees);
            displayResetInfos(dateTime, ip);
            display->drawString(0, 25, temp);
            display->display();
            delay(carrouselDelay);
        }
        else {
            char err_buf[20];
            sprintf(err_buf, "%s Err", donneesString.c_str());
            for(int flick=0; flick<flicker; flick++) {
                displayResetInfos(dateTime, ip);
                display->display();
                delay(carrouselDelay/flicker);
                displayResetInfos(dateTime, ip);
                display->drawString(0, 25, err_buf);
                display->display();
                delay(carrouselDelay/flicker);
            }
        }
    }
}

[[noreturn]] void taskAffichage(void *pvParameters) {
    PAGE page = TEMPERATURE;
    while(true){
        afficher(page, static_cast<struct Donnees *>(pvParameters));
    }
}

void displayText(const String& text, int x, int y, int fontSize, bool centered){
    display->clear();
    switch (fontSize)
    {
    case 10:
        display->setFont(ArialMT_Plain_10);
        break;
    case 24:
        display->setFont(ArialMT_Plain_24);
        break;
    default:
        display->setFont(ArialMT_Plain_16);
        break;
    }
    display->setTextAlignment(TEXT_ALIGN_LEFT);

    if (centered){        
        int w = ((int)text.length()) * fontSize / 2;
        x = (display->getWidth() - w) / 2;
        y = (display->getHeight() - fontSize) / 2;
    }

    display->drawString((short) x, (short) y, text);
    display->display();
}

void displayResetInfos(const String& dateTime, const String& ip) {
    // reset de l'écran
    display->clear();

    // affichage de la date et de l'heure
    display->drawString(0, 0, dateTime);

    // affichage de l'adresse IP
    display->drawString(0,48,"IP : " + ip);
}