#ifndef SERVEURWEB_H
#define SERVEURWEB_H

/**
 * @brief Fonction permettant de configurer le serveur web
 * @details Cette fonction permet de configurer le serveur web en ajoutant les routes et les actions associées
*/
void setupServeurWeb();

/**
 * @brief Fonction permettant d'activer le serveur dns
 * @details Cette fonction permet d'activer le serveur dns au port 53
 */
void setupServeurDNS();

/**
 * @brief Fonction permettant d'activer la tache du serveur de configuration
 * @details Cette fonction permet d'activer la tache du serveur de configuration en configurant le serveur web et le serveur dns
 * @return le handle de la tache du serveur de configuration
 */
xTaskHandle activerServeurDNS();

/**
 * @brief Fonction permettant de savoir si la tache du serveur de configuration est en cours
 * @return true si la tache du serveur de configuration est en cours | false sinon
 */
bool serveurEnCours();

#endif