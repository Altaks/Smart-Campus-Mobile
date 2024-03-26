import {useEffect, useState} from "react";
import {getConseilsGeneraux} from "./APIService.js";
import ConseilCard from "./ConseilCard.jsx";

const ListeConseilsGeneraux = () => {

    let [conseils, setConseils] = useState([]);

    useEffect(() => {
        getConseilsGeneraux().then((data) => setConseils(data));
    }, []);

    if(conseils.length === 0) return (<div>Chargement des conseils ...</div>);

    let conseilsTemp = conseils.filter((conseil) => conseil.type === "temp");
    let conseilsCO2 = conseils.filter((conseil) => conseil.type === "co2");
    let conseilsHum = conseils.filter((conseil) => conseil.type === "hum");

    return (
        <>
            <div className={"mt-5"}>
                <section className={"my-5"}>
                    <h1 className={"w-full text-center text-2xl"}>Conseils Température</h1>
                    <div className={"w-full mx-auto"}>
                        {
                            conseilsTemp.map((conseil, index) => {
                                return (
                                    <ConseilCard recommandation={conseil} index={index}/>
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
                                    <ConseilCard recommandation={conseil} index={index}/>
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
                                    <ConseilCard recommandation={conseil} index={index}/>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default ListeConseilsGeneraux