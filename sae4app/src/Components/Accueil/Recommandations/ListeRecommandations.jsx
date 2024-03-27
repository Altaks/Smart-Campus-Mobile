import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import Recommendation from "./Recommendation.jsx";
import {getRecommandations} from "../../../Services/ApiPlatform/GetRecommandations.js"
import trierRecommandationsPourAffichage from "../../../Utilitaires/TriRecommandations.js";

const ListeRecommandations = ({derniereDonnees}) => { // donnees = [temp, hum, co2]

    const [tempRecommendations, setTempRecommendations] = useState([])
    const [humRecommendations, setHumRecommendations] = useState([])
    const [co2Recommendations, setCo2Recommendations] = useState([])


    useEffect(() => {
        getRecommandations(trierRecommandationsPourAffichage, derniereDonnees[0], derniereDonnees[1], derniereDonnees[2], setTempRecommendations, setHumRecommendations, setCo2Recommendations).then()
    }, [derniereDonnees])

    return (
        <div className={"flex flex-col"}>
            <div>
                {tempRecommendations.map((recommandation, index) => {
                    return <Recommendation key={index} index={index} type={"temp"} texte={recommandation.texte} min={recommandation.min} max={recommandation.max} unite={"°C"}/>
                })}
            </div>
            <div>
                {humRecommendations.map((recommandation, index) => {
                    return <Recommendation key={index} index={index} type={"hum"} texte={recommandation.texte} min={recommandation.min} max={recommandation.max} unite={"%"}/>
                })}
            </div>
            <div>
                {co2Recommendations.map((recommandation, index) => {
                    return <Recommendation key={index} index={index} type={"co2"} texte={recommandation.texte} min={recommandation.min} max={recommandation.max} unite={"ppm"}/>
                })}
            </div>
        </div>
    )
}

ListeRecommandations.propTypes = {
    derniereDonnees: PropTypes.array.isRequired
}

export default ListeRecommandations