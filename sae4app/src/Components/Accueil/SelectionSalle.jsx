import {getSalles} from "../../Services/ApiPlatform/GetSalles.js"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"
import leftArrow from "../../assets/bx-left-arrow.png"
import rightArrow from "../../assets/bx-right-arrow.png"
import trierSalles from "../../Utilitaires/TrierSalles.js"

const animationAffichageFleches = (salle) => {
    if (salle) {
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

const SelectionSalle = ({handleChoixSalle,baseDeDonnees}) => {
    const [salles, setSalles] = useState([])
    const [salle, setSalle] = useState(undefined)


    useEffect(() => {
        getSalles().then((data) => {
            setSalles(trierSalles(data))
        })
    }, [])

    const renderChoixSalle = salles.length >= 1 ? salles.map((salle) => {
      return <option key={salle.id} value={salle.systemesAcquisitions[0].baseDeDonnees}>{salle.nom}</option>
    }) : <></>

    animationAffichageFleches(salle)

    return (
        <>
            <img id={"SallePrecedente"} src={leftArrow}
                 className={"w-8 -translate-x-[100vw] transition-all duration-1000"} alt={"Salle précédente"}
                 onClick={() => {
                     const nouvelleSalle = salles.find(curSalle => curSalle.id === salle.idSallePrecedente)
                     handleChoixSalle(nouvelleSalle.systemesAcquisitions[0].baseDeDonnees)
                     setSalle(nouvelleSalle)
                 }
            }/>
            <select className={"p-2.5 rounded-2xl w-80 bg-gray-200"} value={baseDeDonnees} onChange={(e) => {
                handleChoixSalle(e.target.value)
                setSalle(salles.find(salle => salle.systemesAcquisitions[0].baseDeDonnees === e.target.value))
                document.getElementById("choixParDefaut").disabled = true
            }}>
                <option id={"choixParDefaut"} value={undefined}>Choisissez une salle</option>
                {renderChoixSalle}
            </select>
            <img id={"ProchaineSalle"} src={rightArrow}
                 className={"w-8 translate-x-[100vw] transition-all duration-1000"} alt={"Prochaine salle"}
                 onClick={() => {
                     const nouvelleSalle = salles.find(curSalle => curSalle.id === salle.idProchaineSalle)
                     handleChoixSalle(nouvelleSalle.systemesAcquisitions[0].baseDeDonnees)
                     setSalle(nouvelleSalle)
                 }
            }/>
        </>
    )
}
SelectionSalle.propTypes = {
    handleChoixSalle: PropTypes.func.isRequired,
    baseDeDonnees: PropTypes.string
}

export default SelectionSalle