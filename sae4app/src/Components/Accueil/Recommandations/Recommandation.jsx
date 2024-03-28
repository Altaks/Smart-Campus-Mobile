import PropTypes from "prop-types"
import {AirVent, ChevronLeft, ChevronRight, Droplets, ThermometerSnowflake, ThermometerSun} from "lucide-react";

const acceptedTypes = ["temp", "hum", "co2"]

const Recommandation = ({type, texte, min, max, unite}) => {

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

    const render = () => {
        if (!isValid(type, min, max)) return <></>

        return (
            <div className={`flex py-4 flex-row border-2 rounded-lg my-3 mx-auto mt-0`}>
                <div className="text-md w-1/4 mr-2 flex flex-col justify-center">
                    <div>
                        {incone()}
                    </div>
                    <div className={"w-full text-center mt-2 flex flex-row justify-center"}>
                        {chevron()}
                        {probText()}
                    </div>
                </div>
                <div className="text-md w-3/4 ">La {stype()} est <span className={`text-[${color()}]`}>{prob()}</span>
                    <p>{texte}</p>
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