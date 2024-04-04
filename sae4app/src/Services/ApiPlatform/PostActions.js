import apiConfig from './config.json'

/**
 * Envoie une action à l'API Platform
 * @param salleId identifiant de la salle.
 * @param recommandationId identifiant de la recommandation.
 * @returns {Promise<unknown>}
 * @constructor
 */
const PostActions = (salleId, recommandationId) => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.actionsPath, {
                method:'POST',
                headers: {accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    recommandation: apiConfig.apiPath + apiConfig.recommandationsPath + '/' + recommandationId,
                    salle: apiConfig.apiPath + apiConfig.sallesPath + '/' + salleId
                })
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { PostActions }