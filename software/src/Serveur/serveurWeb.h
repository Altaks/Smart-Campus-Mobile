#ifndef SERVEURWEB_H
#define SERVEURWEB_H

/**
 * Initialise le serveur Web
*/
void setupServeurWeb();

/**
 * Initialise le serveur DNS
 */
void setupServeurDNS();

/**
 * Active le serveur DNS
 */
xTaskHandle activerServeurDNS();

/**
 * Fonction qui permet de stopper le serveur DNS
 * @param serveurTaskHandle : le handle du serveur DNS
 */
void stopServeurDNS(xTaskHandle serveurTaskHandle);

#endif