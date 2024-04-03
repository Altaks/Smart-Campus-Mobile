/**
 * Indique si la recommandation est valide
 * @param recommandation recommandation à vérifier
 * @param curVals valeurs courantes
 * @returns {boolean}
 */
function estValide(recommandation, curVals) {
    if (recommandation.min === undefined && recommandation.max === undefined) return false
    if (recommandation.min === null && recommandation.max === null) return false
    return curVals[recommandation.type] !== null;
}

/**
 * Adapte les recommandations pour les rendre plus faciles à manipuler
 * @param recommandation
 */
function adapterRecommandation(recommandation) {
    recommandation.min = recommandation.min === null ? -Infinity : recommandation.min
    recommandation.max = recommandation.max === null ? Infinity : recommandation.max
}

/**
 * Indique si la recommandation doit être affichée
 * @param recommandation recommandation à vérifier
 * @param curval valeur courante
 * @returns {boolean}
 */
function doitEtreAffiche(recommandation, curval) {
    if (recommandation.min >= curval) return true
    return recommandation.max <= curval
}

/**
 * Indique si la recommandation doit remplacer celle actuellement affichée
 * @param recommandation recommandation à vérifier
 * @param recommandationAAfficher recommandation actuellement affichée
 * @returns {boolean}
 */
function doitRemplacer(recommandation, recommandationAAfficher) {
    if (recommandationAAfficher.id === undefined) return true
    return recommandation.max > recommandationAAfficher.max || recommandation.min < recommandationAAfficher.min
}

/**
 * Trie les recommandations pour les afficher
 * @param recommandations recommandations à trier
 * @param curVals valeurs courantes
 * @param actions actions à réaliser
 * @returns {{hum: {}, temp: {}, co2: {}}}
 */
function trierRecommandationsPourAffichagev2(recommandations, curVals, actions) {
    let recommandationsAAfficher = {'temp' : {}, 'hum' : {}, 'co2' : {}}
    const recommandationIdEffectuees = actions.map(action => {return (action.recommandationId)})

    recommandations.forEach(recommandation => {
        if (!estValide(recommandation, curVals)) return
        if (recommandationIdEffectuees.includes(recommandation.id)) return

        adapterRecommandation(recommandation)

        if (doitEtreAffiche(recommandation, curVals[recommandation.type]) && doitRemplacer(recommandation, recommandationsAAfficher[recommandation.type])) {
            recommandationsAAfficher[recommandation.type] = recommandation
        }
    })

    return recommandationsAAfficher
}

export default trierRecommandationsPourAffichagev2