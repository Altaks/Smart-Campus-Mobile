import apiConfig from './config.json'

const getRecommandations = () => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.recommandationsPath)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { getRecommandations }