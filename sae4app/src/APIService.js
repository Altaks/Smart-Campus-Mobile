const uriBase = 'http://localhost:8000'
const uri = `${uriBase}/api`

const getSalles = () => {
    return new Promise((resolve, reject) => {
        fetch(`${uri}/salles`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        }
    )
}

export { getSalles }

const getSalle = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${uri}/salles/${id}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        }
    )
}

export { getSalle }

const apiDisponible = () => {
    return new Promise((resolve, reject) => {
        fetch(`${uriBase}/`,{
            signal : AbortSignal.timeout(5000)
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        }
    )
}

export { apiDisponible }