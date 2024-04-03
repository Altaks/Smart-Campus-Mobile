import config from "./config.json";

/**
 * Récupère les captures entre deux dates pour une base de données précise depuis l'API Capture.
 * @param baseDeDonnees nom de la base de données.
 * @param dateDebut date de début selon le format ISO.
 * @param dateFin date de fin selon le format ISO.
 * @returns {Promise<unknown>} les captures entre les deux dates.
 */
const getCapturesIntervalle = (baseDeDonnees, dateDebut, dateFin) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/ld+json',
            dbname: baseDeDonnees,
            username: config.username,
            userpass: config.userpass
        }
    }

    return new Promise ((resolve, reject) =>
        fetch(config.urlBase+config.intervalPath+'?date1='+dateDebut+'&date2='+dateFin+'&page=1', options)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    )
}

export default getCapturesIntervalle