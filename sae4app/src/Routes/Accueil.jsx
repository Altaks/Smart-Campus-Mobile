import SelectionSalle from "../Components/Accueil/SelectionSalle.jsx"
import ListeGraphiques from "../Components/Accueil/Graphiques/ListeGraphiques.jsx"
import {useEffect, useState} from "react"
import logo from "../assets/logo_univ_lr.png"
import leftArrow from "../assets/bx-left-arrow.png"
import rightArrow from "../assets/bx-right-arrow.png"
import {getSalle} from "../Services/ApiPlatform/GetSalle.js"
import ListeRecommandations from "../Components/Accueil/Recommandations/ListeRecommandations.jsx"
import {changerTitre} from "../main.jsx";
import BandeauDerniereDonnees from "../Components/Accueil/BandeauDerniereDonnees.jsx";

const animationLogoAndTitreEtGraphique = () => {
    document.getElementById("logo").classList.add("translate-x-[100vw]","transition-all", "duration-1000")
    const titreRender = document.getElementById("titre")
    titreRender.classList.add("-translate-x-[100vw]", "transition-all", "duration-1000")

    setTimeout(() => {
        document.getElementById("logo").classList.remove("w-80", "my-16")
        document.getElementById("logo").classList.add("w-0", "my-0")
        document.getElementById("ChangeSalle").classList.remove("mt-10")
        if(titreRender.offsetHeight > 36 )document.getElementById("ChangeSalle").classList.add("-mt-10") // Si le titre est sur 2 lignes
        document.getElementById("listeGraphique").classList.remove("translate-x-[100vw]")
        document.getElementById("listeGraphique").classList.add("transition-all", "duration-1000")
    }, 650)
}

const animationAffichageFleches = (salle) => {
    if(salle)
    {
        const SallePrecedenteRender = document.getElementById("SallePrecedente")
        if(salle.idSallePrecedente) {
            SallePrecedenteRender.classList.remove("-translate-x-[100vw]")
        }
        else {
            SallePrecedenteRender.classList.add("-translate-x-[100vw]")
        }

        const ProchaineSalleRender = document.getElementById("ProchaineSalle")
        if(salle.idProchaineSalle) {
            ProchaineSalleRender.classList.remove("translate-x-[100vw]")
        }
        else {
            ProchaineSalleRender.classList.add("translate-x-[100vw]")
        }
    }
}

/*
    Récupère les dernières données de la salle
    Recupère les données de température, d'humidité et de CO2 de la salle si ces données ont été capturées il y a moins de 10 minutes
    @param salle : salle dont on veut récupérer les données
 */
const getDernieresDonnees = (salle) => {
    if (salle === undefined) return [null, null, null]
    const curDonnees = salle.data
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
    const [id, setId] = useState(undefined)
    const [salle, setSalle] = useState(undefined)
    const [curDerniereDonnees, setDerniereDonnees] = useState([null, null, null]) // pour l'affichage des recommandations

    changerTitre("Accueil")

    useEffect(() => {
        if(id !== undefined)
            getSalle(id).then((data) => {
                setSalle(data[0])
                setDerniereDonnees([null, null, null])
                setDerniereDonnees(getDernieresDonnees(data[0]))
            })

    }, [id]);

    animationAffichageFleches(salle)

    const handleChoixSalle = (event) => {
        setId(parseInt(event.target.value))
        animationLogoAndTitreEtGraphique(salle)
    }

    return (
        <>
            <img id={"logo"} className={"w-80 my-16"} src={logo} alt={"Smart Campus"}/>
            <h1 id={"titre"} className={"text-[#126CB5] text-3xl font-bold text-center h-full"}>Quelle salle voulez vous consulter ?</h1>
            <div id={"ChangeSalle"} className={"flex transition-all duration-500 mt-10"}>
                <img id={"SallePrecedente"} src={leftArrow} className={"w-8 -translate-x-[100vw] transition-all duration-1000"} alt={"Salle précédente"} onClick={() => setId(salle.idSallePrecedente)}/>
                <SelectionSalle handleChoixSalle={handleChoixSalle} id={id}/>
                <img id={"ProchaineSalle"} src={rightArrow} className={"w-8 translate-x-[100vw] transition-all duration-1000"} alt={"Prochaine salle"} onClick={() => setId(salle.idProchaineSalle)}/>
            </div>
            <div id={"listeGraphique"} className={"translate-x-[100vw] m-auto"}>
                <BandeauDerniereDonnees derniereDonnees={getDernieresDonnees(salle)} isDisplaied={id}/>
                <ListeRecommandations derniereDonnees={curDerniereDonnees}/>
                <ListeGraphiques salle={salle}/>
            </div>
        </>
    )
}

export default Accueil