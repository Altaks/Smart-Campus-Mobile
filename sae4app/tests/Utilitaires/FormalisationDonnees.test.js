import { expect, test } from 'vitest'
import formalisationDonnees from './../../src/Utilitaires/FormalisationDonnees.js'

test('formalisation des données vides', () => {
    const donnees = []
    const donneesAttendues = {
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
            nom: "Qualité de l'air",
            unite: "ppm",
            donnees: []
        }
    }
    const donneesFormalisees = formalisationDonnees(donnees)
    expect(donneesFormalisees).toEqual(donneesAttendues)
})

test('formalisation des données avec une donnée de chaque type', () => {
    const dateCapture = new Date()
    const donnees = [
        {
            nom: "temp",
            dateCapture: dateCapture.toISOString(),
            valeur: 20
        },
        {
            nom: "hum",
            dateCapture: dateCapture.toISOString(),
            valeur: 50
        },
        {
            nom: "co2",
            dateCapture: dateCapture.toISOString(),
            valeur: 400
        }
    ]
    const donneesAttendues = {
        temp: {
            nom: "Température",
            unite: "°C",
            donnees: [{date: dateCapture.toISOString(), valeur: 20}]
        },
        hum: {
            nom: "Humidité",
            unite: "%",
            donnees: [{date: dateCapture.toISOString(), valeur: 50}]
        },
        co2: {
            nom: "Qualité de l'air",
            unite: "ppm",
            donnees: [{date: dateCapture.toISOString(), valeur: 400}]
        }
    }
    const donneesFormalisees = formalisationDonnees(donnees)
    expect(donneesFormalisees).toEqual(donneesAttendues)
})

test('formalisation des données avec une donnée de chaque type et une donnée de température en dehors de la période', () => {
    const dateCapture = new Date()
    const donnees = [
        {
            nom: "temp",
            dateCapture: "2021-01-01T00:00:00.000Z",
            valeur: 20
        },
        {
            nom: "hum",
            dateCapture: dateCapture.toISOString(),
            valeur: 50
        },
        {
            nom: "co2",
            dateCapture: dateCapture.toISOString(),
            valeur: 400
        }
    ]
    const donneesAttendues = {
        temp: {
            nom: "Température",
            unite: "°C",
            donnees: []
        },
        hum: {
            nom: "Humidité",
            unite: "%",
            donnees: [{date: dateCapture.toISOString(), valeur: 50}]
        },
        co2: {
            nom: "Qualité de l'air",
            unite: "ppm",
            donnees: [{date: dateCapture.toISOString(), valeur: 400}]
        }
    }
    const donneesFormalisees = formalisationDonnees(donnees)
    expect(donneesFormalisees).toEqual(donneesAttendues)
})