import PropTypes from "prop-types"
import Graphique from "./Graphique.jsx"

/**
 * Composant représentant la liste des graphiques à afficher.
 * @param donnes
 * @returns {JSX.Element}
 * @constructor
 */
const ListeGraphiques = ({donnes}) => {

    // Si les données ne sont pas définies, on ne retourne rien
    if(donnes === undefined) return <></>
    else {

        /**
         * On parcourt les données pour afficher un graphique pour chaque donnée.
         */
        const graphesRender = Object.entries(donnes).map((data) => {
            const [key,valeur] = data
            return <Graphique key={key} donnees={valeur.donnees} nom={valeur.nom} unite={valeur.unite} />
        })
        return (
            <>{graphesRender}</>
        )
    }
}
ListeGraphiques.propTypes = {
    donnes: PropTypes.object
}

export default ListeGraphiques
