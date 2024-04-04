#ifndef FICHIERSPIFFS_H
#define FICHIERSPIFFS_H
#include <WString.h>

/**
 * Initialise le système de fichier 
*/
void initSystemeFichier();

/**
 * Affiche le contenu d'un fichier
 * @param nomFichier 
*/
void afficherContenuFichier(const String& nomFichier);

/**
 * Modifie le contenu d'un fichier
 * @param nomFichier 
 * @param baliseDebut 
 * @param baliseFin 
 * @param contenu 
*/
void modifierFichier(const String& nomFichier, const String& baliseDebut, const String& baliseFin, const String& contenu);

/**
 * Permet de récupérer une valeur dans un fichier donné
 * la ligne doit être au format "nomvaleur:valeur"
 * @param nomFichier nom du fichier où une valeur est cherchée
 * @param nomValeur nom de la valeur à récupérer
 * @return la valeur associé | un chaine de caractère vide si la valeur n'est pas trouvé
*/
String recupererValeur(const String& nomFichier, String nomValeur);

/**
 * Vérifie si un texte est trouvable dans un fichier donné
 * @param nomFichier nom du fichier
 * @param texte texte a chercher
 * @return true si le texte est trouvable dans le fichier | false sinon
*/
bool estDansFichier(const String& nomFichier, const String& texte);

/**
 * Réécrit le contenu d'un fichier
 * Crée le fichier si nécessaire
 * @param nomFichier nom du fichier où une valeur est cherchée
 * @param contenu nouveau contenu du fichier  
*/
void ecrireFichier(const String& nomFichier, const String& contenu);

#endif