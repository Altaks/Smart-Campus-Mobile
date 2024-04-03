import {expect, test} from "vitest"
import trierRecommandationsPourAffichage from "./../../src/Utilitaires/TriRecommandations.js"

test('tri des recommandations avec les recommandations vide', () => {
    const actions = []
    const recommandations = []
    const recommandationsTrieesAttendues = [{}, {}, {}]
    const recommandationsTriees = trierRecommandationsPourAffichage(recommandations, 20, 50, 400, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test('tri des recommandations avec une seule recommandation a afficher', () => {
    const actions = []
    const recommandations = [
        {
            id: 1,
            min: 17,
            max: null,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        }
    ]
    const recommandationsTrieesAttendues = [
        {
            id: 1,
            min: 17,
            max: Infinity,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {},
        {}
    ]
    const recommandationsTriees = trierRecommandationsPourAffichage(recommandations, 16, 50, 400, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test("tri des recommandations avec plusieurs recommandations a afficher", () => {
    const actions = []
    const recommandations = [
        {
            id: 1,
            min: 17,
            max: null,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 10,
            texte: "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si \n        possible",
            type: "co2",
            min: null,
            max: 1000
        },
        {
            id: 13,
            texte: "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  \n        et ouvrir les portes",
            type: "hum",
            min: null,
            max: 50
        }
    ]
    const recommandationsTrieesAttendues = [
        {
            id: 1,
            min: 17,
            max: Infinity,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 13,
            texte: "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  \n        et ouvrir les portes",
            type: "hum",
            min: -Infinity,
            max: 50
        },
        {
            id: 10,
            texte: "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si \n        possible",
            type: "co2",
            min: -Infinity,
            max: 1000
        }
    ]
    const recommandationsTriees = trierRecommandationsPourAffichage(recommandations, 16, 51, 1200, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test("tri de plusieurs recommandations pour le type co2", () => {
    const actions = []
    const recommandations = [
        {
            id: 10,
            texte: "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si \n        possible",
            type: "co2",
            min: null,
            max: 1000
        },
        {
            id: 11,
            texte: "Ne pas rester trop longtemps dans la salle",
            type: "co2",
            min: null,
            max: 1500
        },
        {
            id: 12,
            texte: "Evacuer la salle",
            type: "co2",
            min: null,
            max: 2000
        },
    ]
    const recommandationsTrieesAttendues = [
        {},
        {},
        {
            id: 11,
            texte: "Ne pas rester trop longtemps dans la salle",
            type: "co2",
            min: -Infinity,
            max: 1500
        }
    ]
    const recommandationsTriees = trierRecommandationsPourAffichage(recommandations, 16, 51, 1700, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test("tri des recommandations avec aucune recommandation a afficher", () => {
    const actions = []
    const recommandations =
    [
        {
            id: 8,
            texte: "Il est recommandé de fermer les fenêtres si elle sont ouvertes\n        et d'allumer le chauffage si ils sont éteints",
            type: "temp",
            min: 17,
            max: null
        },
        {
            id: 9,
            texte: "Il est recommandé d'ouvrir les fenêtres si elle sont fermées\n        et d'éteindre le chauffage s'il est allumé",
            type: "temp",
            min: null,
            max: 21
        },
        {
            id: 10,
            texte: "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si \n        possible",
            type: "co2",
            min: null,
            max: 1000
        },
        {
            id: 11,
            texte: "Ne pas rester trop longtemps dans la salle",
            type: "co2",
            min: null,
            max: 1500
        },
        {
            id: 12,
            texte: "Evacuer la salle",
            type: "co2",
            min: null,
            max: 2000
        },
        {
            id: 13,
            texte: "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  \n        et ouvrir les portes",
            type: "hum",
            min: null,
            max: 50
        },
        {
            id: 14,
            texte: "S'il pleut dehors, ouvrir les fenêtres légèrement\n        sinon ouvrir complètement les fenetres et ouvrir les portes",
            type: "hum",
            min: 30,
            max: null
        }
    ]
    const recommandationsTrieesAttendues = [{}, {}, {}]
    const recommandationsTriees = trierRecommandationsPourAffichage(recommandations, 19, 45, 400, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})