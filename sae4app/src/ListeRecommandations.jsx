import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import Recommendation from "./Recommendation.jsx";
import {getRecommandations} from "./APIService.js";

const ListeRecommandations = ({derniereDonnees}) => { // donnees = [temp, hum, co2]

    const [tempRecommendations, setTempRecommendations] = useState([])
    const [humRecommendations, setHumRecommendations] = useState([])
    const [co2Recommendations, setCo2Recommendations] = useState([])


    useEffect(() => {
        getRecommandations().then((recommandations) => {
            setHumRecommendations([])
            setTempRecommendations([])
            setCo2Recommendations([])
            if (derniereDonnees[0] !== null){
                setTempRecommendations(recommandations.filter(recommandation => recommandation.type === "temp" && (recommandation.min >= derniereDonnees[0] || recommandation.max <= derniereDonnees[0])))
            }
            if (derniereDonnees[1] !== null){
                setHumRecommendations(recommandations.filter(recommandation => recommandation.type === "hum" && (recommandation.min >= derniereDonnees[1] || recommandation.max <= derniereDonnees[1])))
            }
            if (derniereDonnees[2] !== null){
                setCo2Recommendations(recommandations.filter(recommandation => recommandation.type === "co2" && (recommandation.min >= derniereDonnees[2] || recommandation.max <= derniereDonnees[2])))
            }
        })
    } , [derniereDonnees])

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