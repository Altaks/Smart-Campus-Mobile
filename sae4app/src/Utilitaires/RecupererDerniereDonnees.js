/*
    Récupère les dernières données de la salle
    Recupère les données de température, d'humidité et de CO2 de la salle si ces données ont été capturées il y a moins de 10 minutes
    @param salle : salle dont on veut récupérer les données
 */
const recupererDerniereDonnees = (donnees) => {
    if (donnees === undefined) return [null, null, null]
    const curDonnees = donnees

    let curTemp = null
    let curHum = null
    let curCO2 = null

    // const curTimestamp = new Date().getTime() // possible de filtrer les recommandations en fonction du temps depuis la dernière capture
    // const maxTime = 10  * 60 * 1000 // 10 minutes

    if (curDonnees.temp !== undefined && curDonnees.temp.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.temp.donnees[donnees.temp.donnees.length - 1].date).getTime() > maxTime) {
        curTemp = curDonnees.temp.donnees[curDonnees.temp.donnees.length - 1].valeur
        // }
    }
    if (curDonnees.hum !== undefined && curDonnees.hum.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.hum.donnees[donnees.hum.donnees.length - 1].date).getTime() > maxTime){
        curHum = curDonnees.hum.donnees[curDonnees.hum.donnees.length - 1].valeur
        // }
    }
    if (curDonnees.co2 !== undefined && curDonnees.co2.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.co2.donnees[donnees.co2.donnees.length - 1].date).getTime() > maxTime){
        curCO2 = curDonnees.co2.donnees[curDonnees.co2.donnees.length - 1].valeur
        // }
    }

    return [curTemp, curHum, curCO2]

}

export default recupererDerniereDonnees