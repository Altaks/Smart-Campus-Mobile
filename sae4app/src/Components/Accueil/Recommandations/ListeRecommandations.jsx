import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import Recommandation from "./Recommandation.jsx";
import {getRecommandations} from "../../../Services/ApiPlatform/GetRecommandations.js"
import trierRecommandationsPourAffichage from "../../../Utilitaires/TriRecommandations.js";

const ListeRecommandations = ({derniereDonnees}) => { // donnees = [temp, hum, co2]

    const [tempRecommendation, setTempRecommendation] = useState(null)
    const [humRecommendation, setHumRecommendation] = useState(null)
    const [co2Recommendation, setCo2Recommendation] = useState(null)


    useEffect(() => {
        getRecommandations(trierRecommandationsPourAffichage, derniereDonnees[0], derniereDonnees[1], derniereDonnees[2], setTempRecommendation, setHumRecommendation, setCo2Recommendation).then()
    }, [derniereDonnees])

    const afficherRecommandation = (recommandation) => {
        if (recommandation === null) return <></>
        let unite = "";

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

        return (<Recommandation unite={unite} id={recommandation.id} texte={recommandation.texte} type={recommandation.type} min={recommandation.min} max={recommandation.max}/> )

    }


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
    derniereDonnees: PropTypes.array.isRequired
}

export default ListeRecommandations