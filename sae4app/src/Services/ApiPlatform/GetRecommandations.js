import apiConfig from './config.json'

const getRecommandations = (tri, curTemp, curHum, curCo2, actions) => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.recommandationsPath)
                .then(response => response.json())
                .then(data => {
                    const recommandations = tri(data, curTemp, curHum, curCo2, actions)
                    resolve(recommandations)
                })
                .catch(error => reject(error))
        }
    )
}

export { getRecommandations }