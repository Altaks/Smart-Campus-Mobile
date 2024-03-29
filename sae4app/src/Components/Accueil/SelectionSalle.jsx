import {getSalles} from "../../Services/ApiPlatform/GetSalles.js"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"
import leftArrow from "../../assets/bx-left-arrow.png"
import rightArrow from "../../assets/bx-right-arrow.png"
import trierSalles from "../../Utilitaires/TrierSalles.js"

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

const SelectionSalle = ({handleChoixSalle, salle, setSalle}) => {
    const [salles, setSalles] = useState([])

    useEffect(() => {
        getSalles().then((data) => {
            setSalles(trierSalles(data))
        })
    }, [])

    const renderChoixSalle = salles.length >= 1 ? salles.map((curSalle) => {
      return <option key={curSalle.id} value={curSalle.id}>{curSalle.nom}</option>
    }) : <></>

    animationAffichageFleches(salle)

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
    id: PropTypes.number
}

export default SelectionSalle