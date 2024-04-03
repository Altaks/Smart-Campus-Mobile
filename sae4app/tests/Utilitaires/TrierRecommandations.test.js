import {expect, test} from "vitest"
import trierRecommandationsPourAffichagev2 from "../../src/Utilitaires/TrierRecommandations.js";

test('tri des recommandations avec les recommandations vide', () => {
    const actions = []
    const recommandations = []
    const recommandationsTrieesAttendues = {"temp" : {}, "hum" : {}, "co2" : {}}
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 20, "hum" : 50, "co2" : 400}, actions)
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
    const recommandationsTrieesAttendues = {
        "temp": {
            id: 1,
            min: 17,
            max: Infinity,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        "hum": {},
        "co2": {}
    }
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 16, "hum" : 50, "co2" : 400}, actions)
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
    const recommandationsTrieesAttendues = {
        "temp": {
            id: 1,
            min: 17,
            max: Infinity,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        "hum": {
            id: 13,
            texte: "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  \n        et ouvrir les portes",
            type: "hum",
            min: -Infinity,
            max: 50
        },
        "co2": {
            id: 10,
            texte: "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si \n        possible",
            type: "co2",
            min: -Infinity,
            max: 1000
        }
    }
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 16, "hum" : 51, "co2" : 1200 }, actions) //16, 51, 1200
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
    const recommandationsTrieesAttendues = {
        "temp": {},
        "hum": {},
        "co2" : {
            id: 11,
            texte: "Ne pas rester trop longtemps dans la salle",
            type: "co2",
            min: -Infinity,
            max: 1500
        }
    }
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 16, "hum" : 51, "co2" : 1700}, actions) // 16, 51, 1200
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
    const recommandationsTrieesAttendues = {"temp" : {}, "hum" : {}, "co2" : {}}
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 19, "hum" : 45, "co2" : 400}, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})


test ("tri des recommandations avec des recommandations invalides", () => {
    const actions = []
    const recommandations = [
        {
            id: 1,
            min: null,
            max: null,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 2,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 3,
            min: 15,
            max: 21,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 4,
            min: 17,
            max: 21,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        }
    ]
    const recommandationsTrieesAttendues = {"temp" : {}, "hum" : {}, "co2" : {}}
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 19, "hum" : 45, "co2" : 400}, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test ("tri des recommandations avec des recommandations deja effectuees", () => {
    const actions = [
        {
            recommandationId: 1
        },
        {
            recommandationId: 2
        },
        {
            recommandationId: 3
        },
        {
            recommandationId: 4
        }
    ]
    const recommandations = [
        {
            id: 1,
            min: 17,
            max: 28,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 2,
            min: 17,
            max: 28,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 3,
            min: 15,
            max: 21,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        },
        {
            id: 4,
            min: 17,
            max: 21,
            type: "temp",
            text: "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        }
    ]
    const recommandationsTrieesAttendues = {"temp" : {}, "hum" : {}, "co2" : {}}
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 19, "hum" : 45, "co2" : 400}, actions)
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})

test("tri de plusieurs recommandations pour le type hum", () => {
    const actions = []
    const recommandations = [
        {
            id: 13,
            texte: "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres  \n        et ouvrir les portes",
            type: "hum",
            min: null,
            max: 50
        },
        {
            id: 15,
            texte: "Fermer les fenêtres et les portes pour éviter les courants d'air",
            type: "hum",
            min: 50,
            max: null
        },
        {
            id: 14,
            texte: "S'il pleut dehors, ouvrir les fenêtres légèrement\n        sinon ouvrir complètement les fenetres et ouvrir les portes",
            type: "hum",
            min: 30,
            max: null
        }
    ]
    const recommandationsTrieesAttendues = {
        "temp": {},
        "hum": {
            id: 14,
            texte: "S'il pleut dehors, ouvrir les fenêtres légèrement\n        sinon ouvrir complètement les fenetres et ouvrir les portes",
            type: "hum",
            min: 30,
            max: Infinity
        },
        "co2": {}
    }
    const recommandationsTriees = trierRecommandationsPourAffichagev2(recommandations, {"temp" : 16, "hum" : 20, "co2" : 1200}, actions) // 16, 51, 1200
    expect(recommandationsTriees).toEqual(recommandationsTrieesAttendues)
})