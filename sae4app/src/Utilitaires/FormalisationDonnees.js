const formalisationDonnees = (donnees) => {

    donnees = donnees.filter(donnee => {
        const dateHier = new Date()
        dateHier.setDate(dateHier.getDate() - 1)
        return new Date(donnee.dateCapture) >= dateHier
    })

    const donneesFormalisees = {}
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

    donneesFormalisees['temp'] = temp
    donneesFormalisees['hum'] = hum
    donneesFormalisees['co2'] = co2

    return donneesFormalisees
}

export default formalisationDonnees