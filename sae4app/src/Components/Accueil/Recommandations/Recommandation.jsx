import PropTypes from "prop-types"
import {
    AirVent,
    ChevronLeft,
    ChevronRight,
    Droplets,
    SquareCheck, SquareX,
    ThermometerSnowflake,
    ThermometerSun
} from "lucide-react";
import {PostActions} from "../../../Services/ApiPlatform/PostActions.js";

const acceptedTypes = ["temp", "hum", "co2"]

const Recommandation = ({recommandationId, type, texte, min, max, unite, salleId}) => {

    const isValid = (type, min, max) => {
        return !(min != null && max != null) && acceptedTypes.includes(type);
    }



    const incone = () => {
        switch (type) {
            case "temp":
                return min ? <ThermometerSnowflake color={"#18b5cb"} className={"mx-auto"}/> : <ThermometerSun color={"#ba2c48"} className={"mx-auto"}/>
            case "hum":
                return min ? <Droplets color={"#18b5cb"} className={"mx-auto"}/> : <Droplets color={"#ba2c48"} className={"mx-auto"}/>
            case "co2":
                return <AirVent color={"#ba2c48"} className={"mx-auto"}/>
        }
    }

    const color = () => {
        switch (type) {
            case "temp":
                return min ? "#18b5cb" : "#ba2c48"
            case "hum":
                return min ? "#18b5cb" : "#ba2c48"
            case "co2":
                return "#ba2c48"
        }
    }

    const prob = () => {
        switch (type) {
            case "temp":
                return min ? "trop basse" : "trop élevée"
            case "hum":
                return min ? "trop basse" : "trop élevée"
            case "co2":
                return "mauvaise"
        }
    }

    const stype = () => {
        switch (type) {
            case "temp":
                return "température"
            case "hum":
                return "humidité"
            case "co2":
                return "qualité de l'air"
        }
    }

    const chevron = () => {
        return min ? <ChevronLeft color={color()}/> : <ChevronRight color={color()}/>
    }

    const probText = () => {
        return min ? <span className={`text-[${color()}]`}>{min}{unite}</span> :
            <span className={`text-[${color()}]`}>{max}{unite}</span>
    }

    const postAction = () => {

        document.getElementById("post" + recommandationId).classList.remove("translate-y-[12px]")

        document.getElementById("timer" + recommandationId).classList.replace("opacity-0", "opacity-100")
        document.getElementById("cross" + recommandationId).classList.replace("opacity-0", "opacity-100")
        document.getElementById("cross" + recommandationId).classList.add("-translate-y-12")
        document.getElementById("check" + recommandationId).classList.replace("opacity-100", "opacity-0")
        document.getElementById("check" + recommandationId).classList.add("-translate-y-12")

        setTimeout(() => {
            document.getElementById("timer" + recommandationId).textContent = "4"
            setTimeout(() => {
                document.getElementById("timer" + recommandationId).textContent = "3"
                setTimeout(() => {
                    document.getElementById("timer" + recommandationId).textContent = "2"
                    setTimeout(() => {
                        document.getElementById("timer" + recommandationId).textContent = "1"
                        setTimeout(() => {
                            document.getElementById("timer" + recommandationId).textContent = "0"
                            PostActions(salleId, recommandationId).then(r => {
                                    if(r.status === undefined) {
                                        document.getElementById(recommandationId).classList.add("-translate-x-[100vw]")
                                        setTimeout(() => {
                                            document.getElementById(recommandationId).classList.remove("max-h-52",  "border-2", "mb-3", "py-4")
                                            document.getElementById(recommandationId).classList.add("max-h-0")
                                        },1000)
                                    }
                                }
                            )
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)






    }

    const cancelPost = () => {

    }

    const render = () => {
        if (!isValid(type, min, max)) return <></>

        return (
            <div id={recommandationId} className={"flex flex-row items-center border-2 rounded-lg py-4 mb-3 mx-auto max-h-52 transition-all duration-1000 overflow-hidden"}>
                <div className="text-md w-1/4 mr-2 flex flex-col justify-center">
                    <div>
                        {incone()}
                    </div>
                    <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                        {chevron()}
                        {probText()}
                    </div>
                </div>
                <div className="text-md w-3/4 text-justify">La {stype()} est <span className={`text-[${color()}]`}>{prob()}</span>
                    <p>{texte}</p>
                </div>
                <div id={"post" + recommandationId} className={"flex flex-col items-center text-center mr-2 ml-5 duration-500 transition-all translate-y-[12px]"}>
                    <div className={"max-h-12"}>
                        <SquareCheck id={"check" + recommandationId} color={'#22c55e'} size={48} className={'opacity-100 duration-500 transition-all'} onClick={postAction}/>
                        <SquareX id={"cross" + recommandationId} color={'#dc2626'} size={48} className={'opacity-0 duration-500 transition-all'} onClick={cancelPost}/>
                    </div>
                    <p id={"timer" + recommandationId} className={" transition-all duration-500 opacity-0"}>5</p>
                </div>
            </div>
        )
    }



    return (
        <>
            {render()}
        </>
    )

}

Recommandation.propTypes = {
    recommandationId: PropTypes.number,
    type: PropTypes.string,
    texte: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    unite: PropTypes.string.isRequired,
    salleId: PropTypes.number
}

export default Recommandation