/**
 * Fonction qui permet d'animer l'affichage des flèches de navigation entre les salles
 * @param salle salle actuelle
 */
const animationAffichageFleches = (salle) => {
    if (salle.idProchaineSalle !== undefined) {
        const SallePrecedenteRender = document.getElementById("SallePrecedente")
        if (salle.idSallePrecedente) {
            SallePrecedenteRender.classList.remove("-translate-x-[100vw]")
        } else {
            SallePrecedenteRender.classList.add("-translate-x-[100vw]")
        }

        const ProchaineSalleRender = document.getElementById("ProchaineSalle")
        if (salle.idProchaineSalle) {
            ProchaineSalleRender.classList.remove("translate-x-[100vw]")
        } else {
            ProchaineSalleRender.classList.add("translate-x-[100vw]")
        }
    }
}

export default animationAffichageFleches