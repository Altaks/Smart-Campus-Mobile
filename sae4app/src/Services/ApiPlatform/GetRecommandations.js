import apiConfig from './config.json'

const getRecommandations = (tri, curTemp, curHum, curCo2, setTempRecommendations, setHumRecommendations, setCo2Recommendations) => {
    return new Promise((resolve, reject) => {
            fetch(apiConfig.uriBase + apiConfig.apiPath + apiConfig.recommandationsPath)
                .then(response => response.json())
                .then(data => {
                    const recommandations = tri(data, curTemp, curHum, curCo2)
                    setTempRecommendations(recommandations[0])
                    setHumRecommendations(recommandations[1])
                    setCo2Recommendations(recommandations[2])
                    resolve()
                })
                .catch(error => reject(error))
        }
    )
}

export { getRecommandations }