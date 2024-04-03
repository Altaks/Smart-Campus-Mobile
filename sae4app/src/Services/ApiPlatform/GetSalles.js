import apiConfig from './config.json'

/**
 * Récupère les salles depuis l'API Platform.
 * @returns {Promise<unknown>} les salles.
 */
const getSalles = () => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.sallesPath)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { getSalles }

