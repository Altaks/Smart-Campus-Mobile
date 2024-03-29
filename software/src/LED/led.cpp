#include "led.h"

#include <Boutons/boutons.h>

#include "Capteurs/presence.h"
#include "Capteurs/tempEtHum.h"
#include "Capteurs/qualAir.h"

// On the ESP32S2 SAOLA GPIO is the NeoPixel.
#define PIN  18 

Adafruit_NeoPixel * led;

bool tempError, humError, co2Error, envoieError;

namespace LED {
    const int RED[3] = {255,0,0};
    const int ORANGE[3] = {255,50,0};
    const int YELLOW[3] = {255,255,0};
    const int GREEN[3] = {0,255,0};
    const int BLUE[3] = {0,0,255};
    const int PURPLE[3] = {60,0,255};
    const int PINK[3] = {187,38,73};
    const int WHITE[3] = {255,255,255};
    const int OFF[3] = {0,0,0};
}

bool envoieState = true;
bool etatLed = false;

void initLED() {    
    // Single NeoPixel
    led = new Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);
    led->begin(); // INITIALIZE NeoPixel (REQUIRED)
    led->setBrightness(5);
    led->setPixelColor(0, led->Color(LED::WHITE[0],LED::WHITE[1],LED::WHITE[2]));
    led->show();
}

xTaskHandle initTaskLED(Donnees * donnees) {
    xTaskHandle ledTaskHandle;
    xTaskCreate( // Création de la tâche
      taskLED,
      "Gestion des LEDs",
      5000,
      donnees,
      3,
        &ledTaskHandle
    );

    return ledTaskHandle;
}

void taskLED(void *PvParameters) {

    etatLed = true;
    Donnees * donnees = static_cast<Donnees *>(PvParameters);

    while(getMode() == MESURE){
        if(*donnees->temperature == -1) {
            led->setPixelColor(0, led->Color(LED::RED[0],LED::RED[1],LED::RED[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(LED::OFF[0],LED::OFF[1],LED::OFF[2]));
            led->show();
            delay(250);
            tempError = true;
        }
        else {
            tempError = false;
        }

        if(*donnees->humidite == -1) {
            led->setPixelColor(0, led->Color(LED::ORANGE[0],LED::ORANGE[1],LED::ORANGE[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(LED::OFF[0],LED::OFF[1],LED::OFF[2]));
            led->show();
            delay(250);
            humError = true;
        }
        else {
            humError = false;
        }

        if(*donnees->co2 == -1) {
            led->setPixelColor(0, led->Color(LED::YELLOW[0],LED::YELLOW[1],LED::YELLOW[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(LED::OFF[0],LED::OFF[1],LED::OFF[2]));
            led->show();
            delay(250);
            co2Error = true;
        }
        else {
            co2Error = false;
        }

        if(!envoieState) {
            led->setPixelColor(0, led->Color(LED::PINK[0],LED::PINK[1],LED::PINK[2]));
            led->show();
            delay(250);
            led->setPixelColor(0, led->Color(LED::OFF[0],LED::OFF[1],LED::OFF[2]));
            led->show();
            delay(250);
            envoieError = true;
        }
        else {
            envoieError = false;
        }

        if(!tempError and !humError and !co2Error and !envoieError)
        {
            led->setPixelColor(0, led->Color(LED::GREEN[0],LED::GREEN[1],LED::GREEN[2]));
            led->show();
            delay(500);
        }
    }
    etatLed = false;
    vTaskDelete(nullptr);
}

void setEnvoieState(bool envoie)
{
    envoieState = envoie;
}

void setLEDColor(int r, int g, int b) {
    led->setPixelColor(0, led->Color(r,g,b));
    led->show();
}

bool tacheLedEnCours()
{
    return etatLed;
}
