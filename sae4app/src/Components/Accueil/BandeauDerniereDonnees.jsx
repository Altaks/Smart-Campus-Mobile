import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required Swiper modules
import { Autoplay } from "swiper/modules";

/**
 * Composant représentant le bandeau de données en temps réel.
 * Affiche les dernières données de température, d'humidité et de CO2 si elles sont fournies.
 * @param derniereDonnees tableau contenant les dernières données de température, d'humidité et de CO2.
 * @param isDisplayed booléen indiquant si le bandeau est affiché ou non.
 * @returns {*|JSX.Element} le bandeau de données en temps réel.
 * @constructor
 */
const BandeauDerniereDonnees = ({derniereDonnees, isDisplayed}) => { // donnees = [temp, hum, co2]

    // Si le bandeau ne doit pas être affiché, on ne l'affiche pas.
    if (isDisplayed === undefined || isDisplayed === null) return <></>

    /**
     * Définition du rendu des données de température.
     * @returns {JSX.Element}
     */
    let renderTemp = () => {
        if (derniereDonnees[0] === null) return <p>Température : Pas de données</p>
        return <p>Température : {derniereDonnees[0]}°C</p>
    }

    /**
     * Définition du rendu des données d'humidité.
     * @returns {JSX.Element}
     */
    let renderHum = () => {
        if (derniereDonnees[1] === null) return <p>Humidité : Pas de données</p>
        return <p>Humidité : {derniereDonnees[1]}%</p>
    }

    /**
     * Définition du rendu des données de CO2.
     * @returns {JSX.Element}
     */
    let renderCO2 = () => {
        if (derniereDonnees[2] === null) return <p>CO2 : Pas de données</p>
        return <p>CO2 : {derniereDonnees[2]} ppm</p>
    }

    // On retourne le rendu du composant.
    return (
        <>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                }}
                className={"w-[100vw] my-3"} // taille de l'ecran sinon probleme d'affichage
            >
                <SwiperSlide className={"w-full text-center text-2xl mx-auto"}>
                    {renderTemp()}
                </SwiperSlide>
                <SwiperSlide className={"w-full text-center text-2xl mx-auto"}>
                    {renderHum()}
                </SwiperSlide>
                <SwiperSlide className={"w-full text-center text-2xl mx-auto"}>
                    {renderCO2()}
                </SwiperSlide>
            </Swiper>
        </>
    )
}

BandeauDerniereDonnees.propTypes = {
    derniereDonnees: PropTypes.array.isRequired,
    isDisplayed: PropTypes.bool
}

export default BandeauDerniereDonnees
