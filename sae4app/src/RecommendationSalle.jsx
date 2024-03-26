import PropTypes from "prop-types"
import {AirVent, ChevronLeft, ChevronRight, Droplets, ThermometerSnowflake, ThermometerSun} from "lucide-react";

const acceptedTypes = ["temp", "hum", "co2"]

const RecommendationSalle = ({index, type, texte, min, max, unite}) => {

    const isValid = (type, min, max) => {
        return !(min != null && max != null) && acceptedTypes.includes(type);
    }

    const render = () => {
        if (!isValid(type, min, max)) return <></>


        switch (type) {
            case "temp":
                    return (
                        <div className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                            <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                                <div>
                                    {
                                        min ? (
                                            <ThermometerSnowflake color={"#18b5cb"} className={"mx-auto"}/>
                                        ) : (
                                            <ThermometerSun color={"#ba2c48"} className={"mx-auto"}/>
                                        )
                                    }
                                </div>
                                <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                                    {
                                        min ? <ChevronLeft color={"#18b5cb"}/> :
                                            <ChevronRight color={"#ba2c48"}/>
                                    }
                                    {
                                        min ?
                                            <span className={"text-[#18b5cb]"}>{min}{unite}</span>
                                            :
                                            <span className={"text-[#ba2c48]"}>{max}{unite}</span>
                                    }
                                </div>
                            </div>
                            <div className="text-md w-3/4 mx-3">La température est trop {
                                    min ?
                                        <span className={"text-[#18b5cb]"}>basse</span>
                                        :
                                        <span className={"text-[#ba2c48]"}>élevée</span>
                                }
                                <p>{texte}</p>
                            </div>
                        </div>
                    )
            case "hum":
                return (
                    <div className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                        <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                            <div>
                                {
                                    min ? (
                                        <Droplets color={"#18b5cb"} className={"mx-auto"}/>
                                    ) : (
                                        <Droplets color={"#ba2c48"} className={"mx-auto"}/>
                                    )
                                }
                            </div>

                            <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                                {
                                    min ? <ChevronLeft color={"#18b5cb"}/> :
                                        <ChevronRight color={"#ba2c48"}/>
                                }
                                {
                                    min ?
                                        <span className={"text-[#18b5cb]"}>{min}{unite}</span>
                                        :
                                        <span className={"text-[#ba2c48]"}>{max}{unite}</span>
                                }
                            </div>
                        </div>
                        <div>
                            <h5>L'humidité est trop {
                                min ?
                                    <span className={"text-[#18b5cb]"}>basse</span>
                                    :
                                    <span className={"text-[#ba2c48]"}>élevée</span>
                            }</h5>
                            <p>{texte}</p>
                        </div>
                    </div>
                )
            case "co2":
                return (
                    <div className={`flex p-4 ${(index % 2 === 0) ? "flex-row" : "flex-row-reverse"} border-2 rounded-lg my-3 mx-auto`}>
                        <div className="text-md w-1/4 mr-5 flex flex-col justify-center">
                            <div>
                                {
                                    min ? (
                                        <AirVent color={"#ba2c48"} className={"mx-auto"}/>
                                    ) : (
                                        <AirVent color={"#ba2c48"} className={"mx-auto"}/>
                                    )
                                }
                            </div>

                            <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                                {
                                    min ? <ChevronLeft color={"#ba2c48"}/>
                                        :
                                        <ChevronRight color={"#ba2c48"}/>
                                }
                                {
                                    min ?
                                        <span className={"text-[#ba2c48]"}>{min}{unite}</span>
                                        :
                                        <span className={"text-[#ba2c48]"}>{max}{unite}</span>
                                }
                            </div>
                        </div>
                        <div>
                            <h5>La qualité de l'air est <span className={"text-[#ba2c48]"}>mauvaise</span></h5>
                            <p>{texte}</p>
                        </div>
                    </div>
                )
        }
    }


    return (
        <>
            {render()}
        </>
    )

}

RecommendationSalle.propTypes = {
    type: PropTypes.string.isRequired,
    texte: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    index: PropTypes.number.isRequired,
    unite: PropTypes.string.isRequired
}

export default RecommendationSalle