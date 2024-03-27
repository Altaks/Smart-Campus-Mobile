import PropTypes from "prop-types"
const BandeauDerniereDonnees = ({derniereDonnees, isDisplaied}) => { // donnees = [temp, hum, co2]

    let tempRender = document.getElementById("tempBandeau")
    let humRender = document.getElementById("humBandeau")
    let co2Render = document.getElementById("co2Bandeau")

    let renders = [humRender, tempRender, co2Render]

    const timeout = () => {
        setTimeout(() => {

            if (isDisplaied) {

                if (renders[0].style.opacity === "0") {
                    renders[0].style.opacity = "1"
                }

                renders[1].classList.add("-translate-x-[100vw]")
                renders[2].classList.remove("translate-x-[100vw]")
                renders[0].classList.remove("-translate-x-[100vw]")
                renders[0].classList.add("translate-x-[100vw]")

                let temp = renders[0]
                renders[0] = renders[1]
                renders[1] = renders[2]
                renders[2] = temp

                setTimeout(() => {
                    renders[0].classList.remove("duration-1000", "transition-all")
                    renders[0].classList.add("duration-0", "transition-none")
                    renders[2].classList.remove("duration-0", "transition-none")
                    renders[2].classList.add("duration-1000", "transition-all")
                }, 1000)

            }
            timeout()
        }, 4000)
    }

    timeout()

    return (
        <>
            <div id={"bandeau"} className={"flex flex-col flex-nowrap w-full text-center text-2xl -mt-3 -mb-5"}>
                <div id={"humBandeau"} className={"-translate-x-[100vw] translate-y-[32px] duration-0 transition-none  w-full"} style={{opacity : 0}}>
                    <p>Humimidité : {derniereDonnees[1]}%</p>
                </div>
                <div id={"tempBandeau"} className={"duration-1000 transition-all w-full"}>
                    <p>Température : {derniereDonnees[0]}°C</p>
                </div>
                <div id={"co2Bandeau"} className={"translate-x-[100vw] duration-1000 -translate-y-[32px] transition-all w-full"}>
                    <p>Qualité de l&apos;air : {derniereDonnees[2]}ppm</p>
                </div>
            </div>
        </>
    )
}

BandeauDerniereDonnees.propTypes = {
    derniereDonnees: PropTypes.array.isRequired,
    isDisplaied: PropTypes.object.isRequired
}

export default BandeauDerniereDonnees
