import PropTypes from "prop-types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const GraphiqueCard = ({donnees, nom, unite}) => {

    console.log(donnees, nom, unite)
    if (donnees.length === 0)
        return (
            <div id={"div"} className={"border-2 w-5/6 rounded mt-5 p-2"}>
                <h1>{nom} : ({unite})</h1>
                <p>Pas de données</p>
            </div>
        )

    const height = window.innerHeight * 0.2;
    const width = window.innerWidth * 0.8;

    const dateDernièreCaputre = new Date(Date.parse(donnees[donnees.length - 1]['date']))
    const valeurDernièreCapture = donnees[donnees.length - 1]['valeur']
    return (
        <div id={"div"} className={"border-2 rounded mt-5 p-2"}>
            <h1>{nom} : ({unite})</h1>
            <LineChart width={width} height={height} data={donnees}
                       margin={{
                           top: 5,
                           right: 10,
                           left: 5,
                           bottom: 5,
                       }}>
                <CartesianGrid strokeDasharray="3 1"/>
                <XAxis dataKey="date" allowDataOverflow doma/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="valeur" stroke="#8884d8" strokeWidth={2}/>
            </LineChart>
            <div className={"flex justify-between"}>
                <p>Dernière capture à {dateDernièreCaputre.getHours() + ":" + dateDernièreCaputre.getMinutes()}</p>
                <p>{valeurDernièreCapture + unite}</p>
            </div>
        </div>
    )
}
GraphiqueCard.propTypes = {
    donnees: PropTypes.array.isRequired,
    nom: PropTypes.string.isRequired,
    unite: PropTypes.string.isRequired
}

export default GraphiqueCard
