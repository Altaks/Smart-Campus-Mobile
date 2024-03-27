import apiConfig from './config.json'

const getSalle = (id) => {
    return new Promise((resolve, reject) => {
            fetch(`${apiConfig.uriBase}${apiConfig.apiPath}${apiConfig.sallesPath}/${id}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}

export { getSalle }