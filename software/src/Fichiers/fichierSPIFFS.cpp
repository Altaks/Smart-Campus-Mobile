#include "SPIFFS.h"

#include "fichierSPIFFS.h"

void initSystemeFichier()
{
    SPIFFS.begin();
}

void afficherContenuFichier(const String& nomFichier)
{
    File file = SPIFFS.open(nomFichier);

    if(!file)
    {
        Serial.println("Erreur lors de l'ouverture du fichier");
        return;
    }

    Serial.println("Contenu du fichier "+nomFichier+" : ");
    bool estReseaux = nomFichier.equals("/inforeseau.txt");

    while(file.available())
    {
        String current = file.readStringUntil('\n');
        if(estReseaux && strstr(current.c_str(), "mot_de_passe:") != nullptr) continue;
        Serial.println(current);
    }
    Serial.println("\n");
    file.close();
}

void modifierFichier(const String& nomFichier, const String& baliseDebut, const String& baliseFin, const String& contenu)
{
    File file = SPIFFS.open(nomFichier);
    
        if(!file)
        {
            Serial.println("Erreur lors de l'ouverture du fichier");
            return;
        }
    
        String ancienContenuFichier = "";
        while(file.available())
        {
            ancienContenuFichier += (char)file.read();
        }
        file.close();
    
        int indexDebut = ancienContenuFichier.indexOf(baliseDebut);
        int indexFin = ancienContenuFichier.indexOf(baliseFin);

        Serial.println("Index balise "+baliseDebut+" : "+indexDebut);
        Serial.println("Index balise "+baliseFin+" : "+indexFin);
        
        if(indexDebut == -1 || indexFin == -1)
        {
            Serial.println("Erreur lors de la modification du fichier");
            return;
        }
    
        String nouveauContenuFichier = ancienContenuFichier.substring(0, indexDebut + baliseDebut.length()) + "\n" + contenu + "\n" + ancienContenuFichier.substring(indexFin);

        file = SPIFFS.open(nomFichier, FILE_WRITE);
        if(!file)
        {
            Serial.println("Erreur lors de l'ouverture du fichier");
            return;
        }
    
        file.print(nouveauContenuFichier);
        file.close();
}

String recupererValeur(const String& nomFichier, String nomValeur)
{
    File file = SPIFFS.open(nomFichier);
    nomValeur+=':';
    if(!file)
    {
        Serial.println("Erreur lors de l'ouverture du fichier");
        return "";
    }

    String valeur = "";
    String debutLigne = "";
    char lastChar = '0'; 
    while(file.available() && nomValeur != debutLigne)
    {
        lastChar = (char) file.read();
        debutLigne += lastChar;
        if(lastChar == '\n')
        {
            debutLigne = "";
        }
    }

    while(file.available())
    {
        lastChar = (char) file.read();
        if(lastChar =='\n') break;
        valeur += lastChar;
    }
    file.close();
    return valeur;
}

bool estDansFichier(const String& nomFichier, const String& texte)
{
    File file = SPIFFS.open(nomFichier);

    if(!file)
    {
        Serial.println("Erreur lors de l'ouverture du fichier");
        return false;
    }

    String contenuFichier = "";
    while(file.available())
    {
        contenuFichier += (char)file.read();
    }
    file.close();

    return contenuFichier.indexOf(texte) >= 0;    
}

void ecrireFichier(const String& nomFichier, const String& contenu)
{
    if(SPIFFS.exists(nomFichier)) SPIFFS.remove(nomFichier);
    File file = SPIFFS.open(nomFichier,FILE_WRITE,true);

    if(!file)
    {
        Serial.println("Erreur lors de l'ouverture du fichier");
        return ;
    }
    
    file.print(contenu);
    file.close();
}