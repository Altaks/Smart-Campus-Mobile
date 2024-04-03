import apiConfig from './config.json'

/**
 * Récupère les conseils depuis l'API Platform.
 * @returns {Promise<unknown>} les conseils.
 */
const getConseils = () => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.conseilsPath)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { getConseils }