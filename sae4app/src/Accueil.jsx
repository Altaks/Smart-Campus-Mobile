import SelectionSalle from "./SelectionSalle.jsx"
import ListeGraphiques from "./ListeGraphiques.jsx"
import {useEffect, useState} from "react"
import logo from "./assets/logo_univ_lr.png"
import leftArrow from "./assets/bx-left-arrow.png"
import rightArrow from "./assets/bx-right-arrow.png"
import {getSalle} from "./APIService.js"

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
        console.log(salle)

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

const Accueil = () => {
    const [id, setId] = useState(undefined)
    const [salle, setSalle] = useState(undefined)

    useEffect(() => {
        if(id !== undefined)
            getSalle(id).then((data) => setSalle(data[0]))
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
                <ListeGraphiques salle={salle}/>
            </div>
        </>
    )
}

export default Accueil