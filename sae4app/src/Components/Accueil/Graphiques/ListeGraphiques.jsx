import PropTypes from "prop-types"
import Graphique from "./Graphique.jsx"
const ListeGraphiques = ({salle}) => {

    if(salle === undefined) return <></>
    else{
        const graphesRender = Object.entries(salle.data).map((data) => {
            const [key,valeur] = data
            return <Graphique key={key} donnees={valeur.donnees} nom={valeur.nom} unite={valeur.unite} />
        })
        return (
            <>{graphesRender}</>
        )
    }
}
ListeGraphiques.propTypes = {
    salle: PropTypes.object
}

export default ListeGraphiques
