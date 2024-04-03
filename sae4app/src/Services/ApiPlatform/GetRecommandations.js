import apiConfig from './config.json'

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