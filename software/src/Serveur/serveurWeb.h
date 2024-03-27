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

#endif