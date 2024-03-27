import apiConfig from './config.json'

const apiDisponible = () => {
    return new Promise((resolve, reject) => {
            fetch( apiConfig.uriBase,{
                signal : AbortSignal.timeout(5000)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }
    )
}


export { apiDisponible }