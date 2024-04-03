import {expect, test} from "vitest"
import recupererDerniereDonnees from "../../src/Utilitaires/RecupererDerniereDonnees.js";

test("Recuperer le parametres donnes est undifined", async () => {
    const donnees = undefined
    const [curTemp, curHum, curCO2] = recupererDerniereDonnees(donnees)

    expect(curTemp).toBe(null)
    expect(curHum).toBe(null)
    expect(curCO2).toBe(null)
})

test("Recuperer les dernières donnees quand il n'y a pas de données", async () => {
    const donnees = {
        temp: {
            nom: "Température",
            unite: "°C",
            donnees: []
        },
        hum: {
            nom: "Humidité",
            unite: "%",
            donnees: []
        },
        co2: {
            nom: "CO2",
            unite: "ppm",
            donnees: []
        }
    }
    const [curTemp, curHum, curCO2] = recupererDerniereDonnees(donnees)
    expect(curTemp).toBe(null)
    expect(curHum).toBe(null)
    expect(curCO2).toBe(null)
})

test("Recuperer les dernières donnees quand il y a des données", async () => {
    const donnees = {
        temp: {
            nom: "Température",
            unite: "°C",
            donnees: [
                {
                    date: "2021-05-12T12:00:00",
                    valeur: 25
                },
                {
                    date: "2021-05-12T12:10:00",
                    valeur: 26
                },
                {
                    date: "2021-05-12T12:20:00",
                    valeur: 27
                }
            ]
        },
        hum: {
            nom: "Humidité",
            unite: "%",
            donnees: [
                {
                    date: "2021-05-12T12:00:00",
                    valeur: 40
                },
                {
                    date: "2021-05-12T12:10:00",
                    valeur: 41
                },
                {
                    date: "2021-05-12T12:20:00",
                    valeur: 42
                }
            ]
        },
        co2: {
            nom: "CO2",
            unite: "ppm",
            donnees: [
                {
                    date: "2021-05-12T12:00:00",
                    valeur: 500
                },
                {
                    date: "2021-05-12T12:10:00",
                    valeur: 600
                },
                {
                    date: "2021-05-12T12:20:00",
                    valeur: 700
                }
            ]
        }
    }
    const curTempAttendu = 27
    const curHumAttendu = 42
    const curCO2Attendu = 700
    const [curTemp, curHum, curCO2] = recupererDerniereDonnees(donnees)
    expect(curTemp).toEqual(curTempAttendu)
    expect(curHum).toEqual(curHumAttendu)
    expect(curCO2).toEqual(curCO2Attendu)
})

