import apiConfig from './config.json'

/**
 * Récupère les actions depuis l'API Platform.
 * @returns {Promise<unknown>} les actions.
 */
const getActions = () => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.actionsPath)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { getActions }