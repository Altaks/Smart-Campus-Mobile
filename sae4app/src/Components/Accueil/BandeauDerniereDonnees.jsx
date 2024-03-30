import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required Swiper modules
import { Autoplay } from "swiper/modules";

const BandeauDerniereDonnees = ({derniereDonnees, isDisplaied}) => { // donnees = [temp, hum, co2]
    if (isDisplaied === undefined || isDisplaied === null) return <></>

    let renderTemp = () => {
        if (derniereDonnees[0] === null) return <p>Température : Pas de données</p>
        return <p>Température : {derniereDonnees[0]}°C</p>
    }

    let renderHum = () => {
        if (derniereDonnees[1] === null) return <p>Humidité : Pas de données</p>
        return <p>Humidité : {derniereDonnees[1]}%</p>
    }

    let renderCO2 = () => {
        if (derniereDonnees[2] === null) return <p>CO2 : Pas de données</p>
        return <p>CO2 : {derniereDonnees[2]} ppm</p>
    }

    let render = () => {
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
                    <SwiperSlide className={"w-full text-center text-2xl mx-auto"} >
                        {renderCO2()}
                    </SwiperSlide>
                </Swiper>
            </>
        )
    }

    return (render())
}

BandeauDerniereDonnees.propTypes = {
    derniereDonnees: PropTypes.array.isRequired,
    isDisplaied: PropTypes.number
}

export default BandeauDerniereDonnees
