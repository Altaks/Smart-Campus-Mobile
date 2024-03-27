
function trierRecommandationsPourAffichage(recommandations, curTemp, curHum, curCo2) {
    let tempRecommendations = []
    let humRecommendations = []
    let co2Recommendations = []

    recommandations.forEach(recommandation => {
        if (!(recommandation.min === null && recommandation.max === null)) {
            if (recommandation.min === null){
                recommandation.min = -Infinity
            }
            if (recommandation.max === null){
                recommandation.max = Infinity
            }

            if (recommandation.type === "temp"){
                if (recommandation.min >= curTemp){
                    tempRecommendations.push(recommandation)
                }
                else if (recommandation.max <= curTemp){
                    tempRecommendations.push(recommandation)
                }
            }
            else if (recommandation.type === "hum"){
                if (recommandation.min >= curHum){
                    humRecommendations.push(recommandation)
                }
                else if (recommandation.max <= curHum){
                    humRecommendations.push(recommandation)
                }
            }
            else if (recommandation.type === "co2") {
                if (recommandation.min >= curCo2) {
                    co2Recommendations.push(recommandation)
                } else if (recommandation.max <= curCo2) {
                    co2Recommendations.push(recommandation)
                }
            }
        }
    })

    return [tempRecommendations, humRecommendations, co2Recommendations]
}

export default trierRecommandationsPourAffichage