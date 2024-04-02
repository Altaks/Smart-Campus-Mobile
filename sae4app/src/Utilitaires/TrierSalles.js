const trierSalles = (salles) => {
    const sallesTries = salles.sort((salle1,salle2) => {
        if (salle1.nom < salle2.nom) {
            return -1
        }
        if (salle1.nom > salle2.nom) {
            return 1
        }
        return 0
    })

    sallesTries.forEach((salle, index) => {
        salle.idSallePrecedente = index === 0 ? null : sallesTries[index - 1].id
        salle.idProchaineSalle = index === sallesTries.length - 1 ? null : sallesTries[index + 1].id
    })

    return sallesTries
}

export default trierSalles