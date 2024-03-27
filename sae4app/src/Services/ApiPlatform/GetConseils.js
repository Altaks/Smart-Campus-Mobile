import apiConfig from './config.json'
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