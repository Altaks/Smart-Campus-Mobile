import SelectionSalle from "../Components/Accueil/SelectionSalle.jsx"
import ListeGraphiques from "../Components/Accueil/Graphiques/ListeGraphiques.jsx"
import {useState} from "react"
import logo from "../assets/logo_univ_lr.png"
import getCapturesIntervalle from "../Services/ApiCapture/GetCapturesIntervalle.js"
import ListeRecommandations from "../Components/Accueil/Recommandations/ListeRecommandations.jsx"
import BandeauDerniereDonnees from "../Components/Accueil/BandeauDerniereDonnees.jsx"
import {changerTitre} from "../main.jsx"
import formalisationDonnees from "../Utilitaires/FormalisationDonnees.js"
import moment from "moment"

const animationLogoAndTitreEtGraphique = () => {
    document.getElementById("logo").classList.add("translate-x-[100vw]", "transition-all", "duration-1000")
    const titreRender = document.getElementById("titre")
    titreRender.classList.add("-translate-x-[100vw]", "transition-all", "duration-1000")

    setTimeout(() => {
        document.getElementById("logo").classList.remove("w-80", "my-16")
        document.getElementById("logo").classList.add("w-0", "my-0")
        document.getElementById("ChangeSalle").classList.remove("mt-10")
        if (titreRender.offsetHeight > 36) document.getElementById("ChangeSalle").classList.add("-mt-10") // Si le titre est sur 2 lignes
        document.getElementById("listeGraphique").classList.remove("translate-x-[100vw]")
        document.getElementById("listeGraphique").classList.add("transition-all", "duration-1000")
    }, 650)
}

/*
    Récupère les dernières données de la salle
    Recupère les données de température, d'humidité et de CO2 de la salle si ces données ont été capturées il y a moins de 10 minutes
    @param salle : salle dont on veut récupérer les données
 */
const getDernieresDonnees = (donnees) => {
    if (donnees === undefined) return [null, null, null]
    const curDonnees = donnees
    if (curDonnees === undefined) return [null, null, null]

    let curTemp = null
    let curHum = null
    let curCO2 = null

    // const curTimestamp = new Date().getTime() // possible de filtrer les recommandations en fonction du temps depuis la dernière capture
    // const maxTime = 10  * 60 * 1000 // 10 minutes

    if (curDonnees.temp !== undefined && curDonnees.temp.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.temp.donnees[donnees.temp.donnees.length - 1].date).getTime() > maxTime) {
        curTemp = curDonnees.temp.donnees[curDonnees.temp.donnees.length - 1].valeur
        // }
    }
    if (curDonnees.hum !== undefined && curDonnees.hum.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.hum.donnees[donnees.hum.donnees.length - 1].date).getTime() > maxTime){
        curHum = curDonnees.hum.donnees[curDonnees.hum.donnees.length - 1].valeur
        // }
    }
    if (curDonnees.co2 !== undefined && curDonnees.co2.donnees.length > 0) {
        // if (! curTimestamp - new Date(donnees.co2.donnees[donnees.co2.donnees.length - 1].date).getTime() > maxTime){
        curCO2 = curDonnees.co2.donnees[curDonnees.co2.donnees.length - 1].valeur
        // }
    }

    return [curTemp, curHum, curCO2]

}

const Accueil = () => {
    const [baseDeDonnees, setBaseDeDonnees] = useState(undefined)
    const [donnes, setDonnees] = useState(undefined)
    const [curDerniereDonnees, setDerniereDonnees] = useState([null, null, null]) // pour l'affichage des recommandations

    changerTitre("Accueil")

    const handleChoixSalle = (baseDeDonnees) => {
        setBaseDeDonnees(baseDeDonnees)
        const dateHier = new Date()
        dateHier.setDate(dateHier.getDate() - 1)
        const dateDemain = new Date()
        dateDemain.setDate(dateDemain.getDate() + 1)
        getCapturesIntervalle(baseDeDonnees, moment(dateHier).format("YYYY-MM-DD"), moment(dateDemain).format("YYYY-MM-DD")).then((data) => {
            const donnees = formalisationDonnees(data)
            setDonnees(donnees)
            setDerniereDonnees(getDernieresDonnees(donnees))
        })
        animationLogoAndTitreEtGraphique()
    }

    return (
        <>
            <img id={"logo"} className={"w-80 my-16"} src={logo} alt={"Smart Campus"}/>
            <h1 id={"titre"} className={"text-[#126CB5] text-3xl font-bold text-center h-full"}>Quelle salle voulez vous
                consulter ?</h1>
            <div id={"ChangeSalle"} className={"flex transition-all duration-500 mt-10"}>
                <SelectionSalle handleChoixSalle={handleChoixSalle} baseDeDonnees={baseDeDonnees}/>
            </div>
            <div id={"listeGraphique"} className={"translate-x-[100vw] m-auto"}>
                <BandeauDerniereDonnees derniereDonnees={getDernieresDonnees(salle)} isDisplaied={id}/>
                <ListeRecommandations derniereDonnees={curDerniereDonnees}/>
                <ListeGraphiques donnes={donnes}/>
            </div>
        </>
    )
}

export default Accueil