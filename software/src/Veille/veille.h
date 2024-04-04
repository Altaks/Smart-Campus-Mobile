//
// Created by altaks on 04/04/24.
//

#ifndef SOFTWARE_VEILLE_H
#define SOFTWARE_VEILLE_H

/**
 * @brief Met le système en veille pendant une durée donnée à partir de la date donnée (ne prend en compte que les heures, minutes, secondes et non les jours)
 * @param dateAAttendre date à laquelle le système doit se mettre en veille
 * @param delaiVeilleUS durée de la veille en microsecondes
 */
void miseEnVeilleNuit(struct tm dateAAttendre, unsigned long long delaiVeilleUS);

#endif //SOFTWARE_VEILLE_H
