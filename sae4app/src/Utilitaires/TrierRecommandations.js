function estValide(recommandation, curVals) {
    if (recommandation.min === undefined && recommandation.max === undefined) return false
    if (recommandation.min === null && recommandation.max === null) return false
    return curVals[recommandation.type] !== null;
}

function adapterRecommandation(recommandation) {
    recommandation.min = recommandation.min === null ? -Infinity : recommandation.min
    recommandation.max = recommandation.max === null ? Infinity : recommandation.max
}

function doitEtreAffiche(recommandation, curval) {
    if (recommandation.min >= curval) return true
    return recommandation.max <= curval
}

function doitRempalcer(recommandation, recommandationAAfficher) {
    if (recommandationAAfficher.id === undefined) return true
    return recommandation.max > recommandationAAfficher.max || recommandation.min < recommandationAAfficher.min
}

function trierRecommandationsPourAffichagev2(recommandations, curVals, actions) {
    let recommandationsAAfficher = {'temp' : {}, 'hum' : {}, 'co2' : {}}
    const recommandationIdEffectuees = actions.map(action => {return (action.recommandationId)})

    recommandations.forEach(recommandation => {
        if (!estValide(recommandation, curVals)) return
        if (recommandationIdEffectuees.includes(recommandation.id)) return

        adapterRecommandation(recommandation)

        if (doitEtreAffiche(recommandation, curVals[recommandation.type]) && doitRempalcer(recommandation, recommandationsAAfficher[recommandation.type])) {
            recommandationsAAfficher[recommandation.type] = recommandation
        }
    })

    return recommandationsAAfficher
}

export default trierRecommandationsPourAffichagev2