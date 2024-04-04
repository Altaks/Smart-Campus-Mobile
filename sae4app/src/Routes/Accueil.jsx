import SelectionSalle from "../Components/Accueil/SelectionSalle.jsx"
import ListeGraphiques from "../Components/Accueil/Graphiques/ListeGraphiques.jsx"
import {useState} from "react"
import logo from "../assets/logo_univ_lr.png"
import getCapturesIntervalle from "../Services/ApiCapture/GetCapturesIntervalle.js"
import ListeRecommandations from "../Components/Accueil/Recommandations/ListeRecommandations.jsx"
import BandeauDerniereDonnees from "../Components/Accueil/BandeauDerniereDonnees.jsx"
import {changerTitre} from "../main.jsx"
import formalisationDonnees from "../Utilitaires/FormalisationDonnees.js"
import recupererDerniereDonnees from "../Utilitaires/RecupererDerniereDonnees.js";
import animationLogoEtTitreEtGraphique from "../Utilitaires/animationLogoEtTitreEtGraphique.js"
import moment from "moment"

/**
 * Composant représentant la page d'accueil de l'application.
 * @returns {JSX.Element}
 * @constructor
 */
const Accueil = () => {

    // Préparation des états de la salle, des données de la salle et des dernières données pour les recommandations
    const [salle, setSalle] = useState({})
    const [donnes, setDonnees] = useState(undefined)
    const [curDerniereDonnees, setDerniereDonnees] = useState([null, null, null]) // pour l'affichage des recommandations

    // Changement du titre de la page
    changerTitre("Accueil")

    // Fonction permettant de gérer le choix de la salle
    const handleChoixSalle = (salle) => {
        const baseDeDonnees = salle.systemesAcquisitions[0].baseDeDonnees
        setSalle(salle)
        const dateHier = new Date()
        dateHier.setDate(dateHier.getDate() - 1)
        const dateDemain = new Date()
        dateDemain.setDate(dateDemain.getDate() + 1)

        // Récupération des données de la salle et remise à jour des données et des dernières données pour les recommandations
        getCapturesIntervalle(baseDeDonnees, moment(dateHier).format("YYYY-MM-DD"), moment(dateDemain).format("YYYY-MM-DD")).then((data) => {
            const donnees = formalisationDonnees(data)
            setDonnees(donnees)
            setDerniereDonnees(recupererDerniereDonnees(donnees))
        })
        animationLogoEtTitreEtGraphique()
    }

    /**
     * Affichage du composant.
     */
    return (
        <>
            <img id={"logo"} className={"w-80 my-16"} src={logo} alt={"Smart Campus"}/>
            <h1 id={"titre"} className={"text-[#126CB5] text-3xl font-bold text-center h-full"}>Quelle salle voulez vous
                consulter ?</h1>
            <div id={"ChangeSalle"} className={"flex transition-all duration-500 mt-10"}>
                <SelectionSalle handleChoixSalle={handleChoixSalle} salle={salle} setSalle={setSalle}/>
            </div>
            <div id={"listeGraphique"} className={"translate-x-[100vw] m-auto"}>
                <BandeauDerniereDonnees derniereDonnees={curDerniereDonnees} isDisplayed={salle.id}/>
                <ListeRecommandations derniereDonnees={curDerniereDonnees} salleId={salle.id}/>
                <ListeGraphiques donnes={donnes}/>
            </div>
        </>
    )
}

export default Accueil