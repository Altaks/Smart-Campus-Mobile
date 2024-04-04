import {useEffect, useState} from "react"
import {getConseils} from "../Services/ApiPlatform/GetConseils.js"
import Conseil from "../Components/ListeConseils/Conseil.jsx"
import {changerTitre} from "../main.jsx";

/**
 * Composant représentant la liste des conseils à suivre pour une salle.
 * @returns {JSX.Element} Liste des conseils.
 * @constructor
 */
const ListeConseils = () => {

    // Etat représentant la liste des conseils
    let [conseils, setConseils] = useState([])

    // Changement du titre de la page
    changerTitre("Conseils")

    // Récupération des conseils depuis l'API
    useEffect(() => {
        getConseils().then((data) => setConseils(data))
    }, [])

    // Affichage d'un message de chargement si les conseils n'ont pas encore été récupérés
    if(conseils.length === 0) return (<div>Chargement des conseils ...</div>)

    // Filtrage des conseils par type
    let conseilsTemp = conseils.filter((conseil) => conseil.type === "temp")
    let conseilsCO2 = conseils.filter((conseil) => conseil.type === "co2")
    let conseilsHum = conseils.filter((conseil) => conseil.type === "hum")

    // Affichage des conseils
    return (
        <>
            <div className={"mt-5 lg:w-1/2"}>
                <section className={"my-5"}>
                    <h1 className={"w-full text-center text-2xl"}>Conseils Température</h1>
                    <div className={"w-full mx-auto"}>
                        {
                            conseilsTemp.map((conseil, index) => {
                                return (
                                    <Conseil key={index} recommandation={conseil} index={index}/>
                                )
                            })
                        }
                    </div>
                </section>
                <section className={"my-5"}>
                    <h1 className={"w-full text-center text-2xl"}>Conseils CO2</h1>
                    <div className={"w-full mx-auto"}>
                        {
                            conseilsCO2.map((conseil, index) => {
                                return (
                                    <Conseil key={index} recommandation={conseil} index={index}/>
                                )
                            })
                        }
                    </div>
                </section>
                <section className={"my-5"}>
                    <h1 className={"w-full text-center text-2xl"}>Conseils Humidité</h1>
                    <div className={"w-full mx-auto"}>
                        {
                            conseilsHum.map((conseil, index) => {
                                return (
                                    <Conseil key={index} recommandation={conseil} index={index}/>
                                )
                            })
                        }
                    </div>
                </section>
                <hr/>
                <section className={"my-5"}>
                    Sources :
                    <ol className={"ml-5"}>
                        <li className={"list-disc"}>
                            <a
                                className={"underline text-[#126CB5]"}
                                target={"_blank"}
                                href="https://batiscolaire.education.gouv.fr/sites/default/files/2022-11/sobrie-te-e-nerge-tique-des-e-coles-et-e-tablissements-scolaires---novembre-2022-pdf-38441.pdf">
                                Ministère de l&apos;éducation
                            </a>
                        </li>
                        <li className={"list-disc"}>
                            <span>
                                Conseils définis par le personnel
                            </span>
                        </li>
                    </ol>
                </section>
            </div>
        </>
    )
}

export default ListeConseils