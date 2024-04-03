import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import Recommandation from "./Recommandation.jsx";
import {getRecommandations} from "../../../Services/ApiPlatform/GetRecommandations.js"
import {getActions} from "../../../Services/ApiPlatform/GetActions.js";
import trierActions from "../../../Utilitaires/FiltrerActionsSalle.js";
import trierRecommandationsPourAffichagev2 from "../../../Utilitaires/TrierRecommandations.js";

/**
 * Composant représentant la liste des recommandations pour une salle en fonction des dernières mesures.
 * @param derniereDonnees tableau contenant les dernières données de température, d'humidité et de CO2.
 * @param salleId identifiant de la salle concernée.
 * @returns {JSX.Element} la liste des recommandations.
 * @constructor
 */
const ListeRecommandations = ({derniereDonnees, salleId}) => { // donnees = [temp, hum, co2]

    // Etats représentant les recommandations pour chaque type de données
    const [tempRecommendation, setTempRecommendation] = useState({})
    const [humRecommendation, setHumRecommendation] = useState({})
    const [co2Recommendation, setCo2Recommendation] = useState({})

    // Récupération des recommandations en fonction des dernières données et de la salle
    useEffect(() => {

        // Si l'identifiant de la salle est défini, on récupère les actions et on trie les recommandations
        if(salleId !== undefined)
            getActions().then(
                actions => {
                    const actionsTriees = trierActions(actions, salleId)
                    getRecommandations(trierRecommandationsPourAffichagev2, {"temp" : derniereDonnees[0], "hum" : derniereDonnees[1], "co2" : derniereDonnees[2]}, actionsTriees).then(recommandations => {
                        setTempRecommendation(recommandations["temp"])
                        setHumRecommendation(recommandations["hum"])
                        setCo2Recommendation(recommandations["co2"])
                    })
                })
    }, [derniereDonnees, salleId]);

    /**
     * Fonction permettant de déterminer le composant à afficher en fonction de la recommandation.
     * @param recommandation
     * @returns {JSX.Element}
     */
    const afficherRecommandation = (recommandation) => {
        if (recommandation.type === undefined) return <></>
        let unite = "";

        // Déterminer l'unité en fonction du type de recommandation
        switch (recommandation.type){
            case "temp":
                unite = "°C"
                break
            case "hum":
                unite = "%"
                break
            case "co2":
                unite = "ppm"
                break
        }

        return (<Recommandation unite={unite} recommandationId={recommandation.id} texte={recommandation.texte} type={recommandation.type} min={recommandation.min} max={recommandation.max} salleId={salleId}/> )

    }

    // On retourne le rendu du composant
    return (
        <div className={"flex flex-col"}>
            <div>
                {afficherRecommandation(tempRecommendation)}
            </div>
            <div>
                {afficherRecommandation(humRecommendation)}
            </div>
            <div>
                {afficherRecommandation(co2Recommendation)}
            </div>
        </div>
    )
}

ListeRecommandations.propTypes = {
    derniereDonnees: PropTypes.array.isRequired,
    salleId: PropTypes.number
}

export default ListeRecommandations