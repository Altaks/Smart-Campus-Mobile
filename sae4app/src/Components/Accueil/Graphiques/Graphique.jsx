import PropTypes from "prop-types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

/**
 * Composant représentant un graphique.
 * @param donnees tableau contenant les données à afficher.
 * @param nom nom du graphique.
 * @param unite unité des données.
 * @returns {JSX.Element} le graphique.
 * @constructor
 */
const Graphique = ({donnees, nom, unite}) => {

    // Si les données ne sont pas définies, on ne retourne un message indiquant qu'il n'y a pas de données
    if (donnees.length === 0)
        return (
            <div id={"div"} className={"border-2 w-max-5/6 rounded mt-5 p-2"}>
                <h1 className={"w-full"}>{nom} : ({unite})</h1>
                <p>Pas de données</p>
            </div>
        )

    // Sinon, on prépare le graphique
    const height = window.innerHeight * 0.2;
    const width = window.innerWidth * 0.8;

    const dateDerniereCapture = new Date(Date.parse(donnees[donnees.length - 1]['date']))
    const valeurDerniereCapture = donnees[donnees.length - 1]['valeur']

    // On retourne le rendu du composant
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
                <p>Dernière capture à {dateDerniereCapture.getHours() + ":" + dateDerniereCapture.getMinutes()}</p>
                <p>{valeurDerniereCapture + unite}</p>
            </div>
        </div>
    )
}

Graphique.propTypes = {
    donnees: PropTypes.array.isRequired,
    nom: PropTypes.string.isRequired,
    unite: PropTypes.string.isRequired
}

export default Graphique
