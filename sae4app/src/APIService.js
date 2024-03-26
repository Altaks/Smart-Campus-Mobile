const uri = 'http://localhost:8000/api'

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

const getConseilsGeneraux = () => {
    return new Promise((resolve, reject) => {
        fetch(`${uri}/conseils`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        }
    )
}

export { getConseilsGeneraux }