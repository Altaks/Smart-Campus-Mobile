import {getSalles} from "../../Services/ApiPlatform/GetSalles.js"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"
import leftArrow from "../../assets/bx-left-arrow.png"
import rightArrow from "../../assets/bx-right-arrow.png"
import trierSalles from "../../Utilitaires/TrierSalles.js"
import animationAffichageFleches from "../../Utilitaires/animationAffichageFleches.js"

/**
 * Composant permettant de choisir une salle parmi une liste de salles.
 * @param handleChoixSalle fonction à exécuter lors du choix de la salle.
 * @param salle salle actuellement sélectionnée.
 * @param setSalle référence de la fonction permettant de modifier la salle présentement sélectionnée.
 * @returns {JSX.Element}
 * @constructor
 */
const SelectionSalle = ({handleChoixSalle, salle, setSalle}) => {

    /**
     * Etat représentant la liste des salles.
     */
    const [salles, setSalles] = useState([])


    /**
     * Récupération des salles et tri de celles-ci.
     */
    useEffect(() => {
        getSalles().then((data) => {
            setSalles(trierSalles(data))
        })
    }, [])

    /**
     * Définition des options de sélection de salle en fonction du nombre de salles disponibles.
     * @type {unknown[]|JSX.Element}
     */
    const renderChoixSalle = salles.length >= 1 ? salles.map((curSalle) => {
      return <option key={curSalle.id} value={curSalle.id}>{curSalle.nom}</option>
    }) : <></>

    animationAffichageFleches(salle)

    /**
     * Affichage du composant.
     * Composé d'une flèche vers la gauche qui, lors du clic, permet de sélectionner la salle précédente.
     * Suivi d'une liste déroulante permettant de sélectionner une salle parmi la liste des salles.
     * Enfin, une flèche vers la droite permet de sélectionner la salle suivante.
     */
    return (
        <>
            <img id={"SallePrecedente"} src={leftArrow}
                 className={"w-8 -translate-x-[100vw] transition-all duration-1000"} alt={"Salle précédente"}
                 onClick={() => {
                     const nouvelleSalle = salles.find(curSalle => curSalle.id === salle.idSallePrecedente)
                     handleChoixSalle(nouvelleSalle)
                     setSalle(nouvelleSalle)
                 }
            }/>
            <select className={"p-2.5 rounded-2xl w-80 bg-gray-200"} value={salle.id} onChange={(e) => {
                const nouvelleSalle = salles.find(salle => salle.id === parseInt(e.target.value))
                setSalle(nouvelleSalle)
                handleChoixSalle(nouvelleSalle)
                document.getElementById("choixParDefaut").disabled = true
            }}>
                <option id={"choixParDefaut"} value={undefined}>Choisissez une salle</option>
                {renderChoixSalle}
            </select>
            <img id={"ProchaineSalle"} src={rightArrow}
                 className={"w-8 translate-x-[100vw] transition-all duration-1000"} alt={"Prochaine salle"}
                 onClick={() => {
                     const nouvelleSalle = salles.find(curSalle => curSalle.id === salle.idProchaineSalle)
                     handleChoixSalle(nouvelleSalle)
                     setSalle(nouvelleSalle)
                 }
            }/>
        </>
    )
}
SelectionSalle.propTypes = {
    handleChoixSalle: PropTypes.func.isRequired,
    salle: PropTypes.object,
    setSalle: PropTypes.func.isRequired
}

export default SelectionSalle