import logo from "./assets/logo_univ_lr.png"
import {useEffect, useState} from "react"
import {apiDisponible} from "./APIService.js"

const APIIndisponible = () => {
    const [APIIndisponible, setAPIIndisponible] = useState(false)

    async function verifierAPIIndisponible(){
        await apiDisponible().then((data) => {
            if(data.message === 'L\'API est disponible.')
                setAPIIndisponible(false)
            else
                setAPIIndisponible(true)
        }).catch(() => {
            setAPIIndisponible(true)
        })
        setTimeout(() => {
            verifierAPIIndisponible()
        }, 5000)
    }

    useEffect(() => {
        verifierAPIIndisponible()
    })

    useEffect(() => {
        if(APIIndisponible)
        {
            document.getElementById("apiIndisponible").classList.remove("-top-[100vh]")
            document.getElementById("apiIndisponible").classList.add("top-0", "transition-all", "duration-1000")
        }
        else
        {
            document.getElementById("apiIndisponible").classList.remove("top-0")
            document.getElementById("apiIndisponible").classList.add("-top-[100vh]", "transition-all", "duration-1000")
        }
    }, [APIIndisponible])

    return (
        <div id={"apiIndisponible"} className={"absolute bg-white flex items-center flex-col w-full h-full -top-[100vh]"}>
            <img id={"logo"} className={"w-80 my-16"} src={logo} alt={"Smart Campus"}/>
            <h1 className={"text-[#126CB5] text-3xl font-bold text-center"}>Désolé les informations ne sont pas disponibles.</h1>
            <h2 className={"text-[#126CB5] text-2xl font-bold text-center mt-10"}>Si le problème persiste contactez nous par mail à l&apos;adresse kevin.simon@etudiant.univ-lr.fr.</h2>
        </div>
    )
}

export default APIIndisponible