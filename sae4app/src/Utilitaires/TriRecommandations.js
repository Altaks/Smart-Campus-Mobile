
function trierRecommandationsPourAffichage(recommandations, curTemp, curHum, curCo2) {
    let recommandationsAAfficher = [null, null, null]

    recommandations.forEach(recommandation => {
        if (!(recommandation.min === null && recommandation.max === null)) {
            if (recommandation.min === null){
                recommandation.min = -Infinity
            }
            if (recommandation.max === null){
                recommandation.max = Infinity
            }

            if (recommandation.type === "temp" && curTemp !== null){
                if (recommandation.min >= curTemp){
                    if (recommandationsAAfficher[0] === null){
                        recommandationsAAfficher[0] = recommandation
                    } else if (recommandationsAAfficher[0].min > recommandation.min){
                        recommandationsAAfficher[0] = recommandation
                    }
                }
                else if (recommandation.max <= curTemp){
                    if (recommandationsAAfficher[0] === null){
                        recommandationsAAfficher[0] = recommandation
                    } else if (recommandationsAAfficher[0].max < recommandation.max){
                        recommandationsAAfficher[0] = recommandation
                    }
                }
            }
            else if (recommandation.type === "hum" && curHum !== null){
                if (recommandation.min >= curHum){
                    if (recommandationsAAfficher[1] === null){
                        recommandationsAAfficher[1] = recommandation
                    } else if (recommandationsAAfficher[1].min > recommandation.min){
                        recommandationsAAfficher[1] = recommandation
                    }
                }
                else if (recommandation.max <= curHum){
                    if (recommandationsAAfficher[1] === null){
                        recommandationsAAfficher[1] = recommandation
                    } else if (recommandationsAAfficher[1].max < recommandation.max){
                        recommandationsAAfficher[1] = recommandation
                    }
                }
            }
            else if (recommandation.type === "co2" && curCo2 !== null) {
                if (recommandation.min >= curCo2) {
                    if (recommandationsAAfficher[2] === null){
                        recommandationsAAfficher[2] = recommandation
                    } else if (recommandationsAAfficher[2].min > recommandation.min){
                        recommandationsAAfficher[2] = recommandation
                    }
                } else if (recommandation.max <= curCo2) {
                    if (recommandationsAAfficher[2] === null){
                        recommandationsAAfficher[2] = recommandation
                    } else if (recommandationsAAfficher[2].max < recommandation.max){
                        recommandationsAAfficher[2] = recommandation
                    }
                }
            }
        }
    })

    return recommandationsAAfficher
}

export default trierRecommandationsPourAffichage