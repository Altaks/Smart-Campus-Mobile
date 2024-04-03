import apiConfig from './config.json'

/**
 * Récupère les recommandations depuis l'API Platform.
 * @param tri fonction de tri des recommandations.
 * @param curVals valeurs courantes.
 * @param actions actions à réaliser.
 * @returns {Promise<unknown>} les recommandations.
 */
const getRecommandations = (tri, curVals, actions) => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.recommandationsPath)
                .then(response => response.json())
                .then(data => {
                    const recommandations = tri(data, curVals, actions)
                    resolve(recommandations)
                })
                .catch(error => reject(error))
        }
    )
}

export { getRecommandations }