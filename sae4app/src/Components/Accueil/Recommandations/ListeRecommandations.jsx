import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import Recommandation from "./Recommandation.jsx";
import {getRecommandations} from "../../../Services/ApiPlatform/GetRecommandations.js"
import {getActions} from "../../../Services/ApiPlatform/GetActions.js";
import trierActions from "../../../Utilitaires/FiltrerActionsSalle.js";
import trierRecommandationsPourAffichagev2 from "../../../Utilitaires/TrierRecommandations.js";

const ListeRecommandations = ({derniereDonnees, salleId}) => { // donnees = [temp, hum, co2]


    const [tempRecommendation, setTempRecommendation] = useState({})
    const [humRecommendation, setHumRecommendation] = useState({})
    const [co2Recommendation, setCo2Recommendation] = useState({})

    useEffect(() => {
        if(salleId !== undefined)
            getActions().then(
                actions => {
                    const actionsTriees = trierActions(actions, salleId)
                    getRecommandations(trierRecommandationsPourAffichagev2, {"temp" : derniereDonnees[0], "hum" : derniereDonnees[1], "co2" : derniereDonnees[2]}, actionsTriees).then(recommandations => {
                        setTempRecommendation(recommandations["temp"])
                        setHumRecommendation(recommandations["hum"])
                        setCo2Recommendation(recommandations["co2"])
                        setTimeout(()=>{

                        })
                    })
                })
    }, [derniereDonnees, salleId]);

    const afficherRecommandation = (recommandation) => {
        if (recommandation.type === undefined) return <></>
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

        return (<Recommandation unite={unite} recommandationId={recommandation.id} texte={recommandation.texte} type={recommandation.type} min={recommandation.min} max={recommandation.max} salleId={salleId}/> )

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
    derniereDonnees: PropTypes.array.isRequired,
    salleId: PropTypes.number
}

export default ListeRecommandations