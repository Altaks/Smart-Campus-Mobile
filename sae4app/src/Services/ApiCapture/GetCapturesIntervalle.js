import config from "./config.json";

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