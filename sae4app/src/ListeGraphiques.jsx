import PropTypes from "prop-types"
import GraphiqueCard from "./GraphiqueCard.jsx"
const ListeGraphiques = ({salle}) => {

    if(salle === undefined) return <></>
    else{
        const graphesRender = Object.entries(salle.data).map((data) => {
            const [key,valeur] = data
            console.log(valeur)
            return <GraphiqueCard key={key} donnees={valeur.donnees} nom={valeur.nom} unite={valeur.unite} />
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
