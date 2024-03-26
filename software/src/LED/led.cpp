#include "led.h"
#include "Capteurs/presence.h"
#include "Capteurs/tempEtHum.h"
#include "Capteurs/qualAir.h"

// On the ESP32S2 SAOLA GPIO is the NeoPixel.
#define PIN  18 

Adafruit_NeoPixel * led;

bool tempError, humError, co2Error, envoieError;

const int RED[3] = {255,0,0};
const int ORANGE[3] = {255,50,0};
const int YELLOW[3] = {255,255,0};
const int GREEN[3] = {0,255,0};
const int BLUE[3] = {0,0,255};
const int PURPLE[3] = {60,0,255};
const int PINK[3] = {187,38,73};
const int WHITE[3] = {255,255,255};
const int OFF[3] = {0,0,0};

bool envoieState = true;

void initLED() {    
    // Single NeoPixel
    led = new Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);
    led->begin(); // INITIALIZE NeoPixel (REQUIRED)
    led->setBrightness(5);
    led->setPixelColor(0, led->Color(WHITE[0],WHITE[1],WHITE[2]));
    led->show();
}

bool initTaskLED(Donnees * donnees) {
    xTaskHandle ledTaskHandle;
    xTaskCreate( // Création de la tâche
      taskLED,
      "Gestion des LEDs",
      5000,
      donnees,
      1,
        &ledTaskHandle
    );

    return ledTaskHandle != NULL;
}

void taskLED(void *PvParameters) {

    Donnees * donnees = static_cast<Donnees *>(PvParameters);

    while(true){
        if(*donnees->temperature == -1) {
            led->setPixelColor(0, led->Color(RED[0],RED[1],RED[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(OFF[0],OFF[1],OFF[2]));
            led->show();
            delay(250);
            tempError = true;
        }
        else {
            tempError = false;
        }

        if(*donnees->humidite == -1) {
            led->setPixelColor(0, led->Color(ORANGE[0],ORANGE[1],ORANGE[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(OFF[0],OFF[1],OFF[2]));
            led->show();
            delay(250);
            humError = true;
        }
        else {
            humError = false;
        }

        if(*donnees->co2 == -1) {
            led->setPixelColor(0, led->Color(YELLOW[0],YELLOW[1],YELLOW[2]));
            led->show();
            delay(250); 
            led->setPixelColor(0, led->Color(OFF[0],OFF[1],OFF[2]));
            led->show();
            delay(250);
            co2Error = true;
        }
        else {
            co2Error = false;
        }

        if(!envoieState) {
            led->setPixelColor(0, led->Color(PINK[0],PINK[1],PINK[2]));
            led->show();
            delay(250);
            led->setPixelColor(0, led->Color(OFF[0],OFF[1],OFF[2]));
            led->show();
            delay(250);
            envoieError = true;
        }
        else {
            envoieError = false;
        }

        if(!tempError and !humError and !co2Error and !envoieError)
        {
            led->setPixelColor(0, led->Color(GREEN[0],GREEN[1],GREEN[2]));
            led->show();
            delay(500);
        }
    }
}

void setEnvoieState(bool envoie)
{
    envoieState = envoie;
}

void setLEDColor(int r, int g, int b) {
    led->setPixelColor(0, led->Color(r,g,b));
    led->show();
}

