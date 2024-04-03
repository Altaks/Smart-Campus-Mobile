/**
 * Cette fonction permet de formaliser les données reçues du serveur pour les afficher dans les graphiques
 * @param donnees données reçues du serveur
 * @returns {{}}
 */
const formalisationDonnees = (donnees) => {

    // On filtre les données pour ne garder que celles de la veille à aujourd'hui
    donnees = donnees.filter(donnee => {
        const dateHier = new Date()
        dateHier.setDate(dateHier.getDate() - 1)
        return new Date(donnee.dateCapture) >= dateHier
    })

    // On crée une map qui contiendra les données formalisées
    const donneesFormalisees = {}

    // On crée un objet pour chaque type de données
    const temp = {
        nom: "Température",
        unite: "°C",
        donnees: []
    }
    const hum = {
        nom: "Humidité",
        unite: "%",
        donnees: []
    }
    const co2 = {
        nom: "Qualité de l'air",
        unite: "ppm",
        donnees: []
    }

    donnees.filter(donnee => {
        return donnee.nom === "temp"
    }).forEach((donnee) => {
        temp.donnees.push({date: donnee.dateCapture, valeur: donnee.valeur})
    })

    donnees.filter(donnee => {
        return donnee.nom === "hum"
    }).forEach((donnee) => {
        hum.donnees.push({date: donnee.dateCapture, valeur: donnee.valeur})
    })

    donnees.filter(donnee => {
        return donnee.nom === "co2"
    }).forEach((donnee) => {
        co2.donnees.push({date: donnee.dateCapture, valeur: donnee.valeur})
    })

    // On ajoute les données formalisées à l'objet contenant toutes les données
    donneesFormalisees['temp'] = temp
    donneesFormalisees['hum'] = hum
    donneesFormalisees['co2'] = co2

    return donneesFormalisees
}

export default formalisationDonnees