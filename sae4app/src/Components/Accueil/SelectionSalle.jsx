import {getSalles} from "../../Services/ApiPlatform/GetSalles.js"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"

const SelectionSalle = ({handleChoixSalle,id}) => {
    const [salles, setSalles] = useState([])


    useEffect(() => {
        getSalles().then((data) => {
            setSalles(data)
        })
    }, [])

    const renderChoixSalle = salles.length >= 1 ? salles.map((salle) => {
      return <option key={salle.id} value={salle.id}>{salle.nom}</option>
    }) : <></>


    return (
        <>
            <select className={"p-2.5 rounded-2xl w-80 bg-gray-200"} value={id} onChange={(e) => {
                handleChoixSalle(e)
                document.getElementById("choixParDefaut").disabled = true
            }}>
                <option id={"choixParDefaut"} value={undefined}>Choisissez une salle</option>
                {renderChoixSalle}
            </select>
        </>
    )
}
SelectionSalle.propTypes = {
    handleChoixSalle: PropTypes.func.isRequired,
    id: PropTypes.number
}

export default SelectionSalle