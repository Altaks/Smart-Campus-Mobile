import PropTypes from "prop-types";
import {AirVent, ChevronLeft, ChevronRight, Droplets, ThermometerSnowflake, ThermometerSun} from "lucide-react";

/**
 * Composant représentant un conseil.
 * @param recommandation objet représentant le conseil.
 * @param index int index du conseil dans la liste.
 * @returns {JSX.Element} le conseil.
 * @constructor
 */
const Conseil = ({ recommandation, index}) => {

    /**
     * En fonction du type de recommandation, on affiche un design différent (icones), et en fonction du type de conseil, on change les couleurs du composant
     * Les alignements des composants sont également différents en fonction de l'index du conseil dans la liste, ils alternent entre gauche et droite.
     */
    switch (recommandation.type) {
        case "temp": {
            return (
                <div className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                    <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                        <div>
                            {
                                recommandation.min ? (
                                    <ThermometerSnowflake color={"#18b5cb"} className={"mx-auto"}/>
                                ) : (
                                    <ThermometerSun color={"#ba2c48"} className={"mx-auto"}/>
                                )
                            }
                        </div>
                        <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                            {
                                recommandation.min ? <ChevronLeft color={"#18b5cb"}/> : <ChevronRight color={"#ba2c48"}/>
                            }
                            {
                                recommandation.min ?
                                    <span className={"text-[#18b5cb]"}>{recommandation.min} °C</span>
                                :
                                    <span className={"text-[#ba2c48]"}>{recommandation.max} °C</span>
                            }
                        </div>
                    </div>
                    <div className="text-md w-3/4 mx-3">{recommandation.texte}</div>
                </div>
            )
        }
        case "co2" : {
            return (
                <div
                    className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                    <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                        <div>
                            <AirVent color={"#ba2c48"} className={"mx-auto"}/>
                        </div>
                        <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                            <ChevronRight color={"#ba2c48"}/>
                            <span className={"text-[#ba2c48]"}>{recommandation.max} ppm</span>
                        </div>
                    </div>
                    <div className="text-md w-3/4 mx-3">{recommandation.texte}</div>
                </div>
            )
        }
        case "hum" : {
            return (
                <div
                    className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                    <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                        <div>
                            {
                                recommandation.min ? (
                                    <Droplets color={"#18b5cb"} className={"mx-auto"}/>
                                ) : (
                                    <Droplets color={"#ba2c48"} className={"mx-auto"}/>
                                )
                            }
                        </div>
                        <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                            {
                                recommandation.min ? <ChevronLeft color={"#18b5cb"}/> :
                                    <ChevronRight color={"#ba2c48"}/>
                            }
                            {
                                recommandation.min ?
                                    <span className={"text-[#18b5cb]"}>{recommandation.min} %</span>
                                    :
                                    <span className={"text-[#ba2c48]"}>{recommandation.max} %</span>
                            }
                        </div>
                    </div>
                    <div className="text-md w-3/4 mx-3">{recommandation.texte}</div>
                </div>
            )
        }
        default:
            break;
    }
}

Conseil.propTypes = {
    recommandation: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default Conseil;