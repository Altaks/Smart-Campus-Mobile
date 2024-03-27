import PropTypes from "prop-types"
import Graphique from "./Graphique.jsx"
const ListeGraphiques = ({donnes}) => {

    if(donnes === undefined) return <></>
    else{
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
