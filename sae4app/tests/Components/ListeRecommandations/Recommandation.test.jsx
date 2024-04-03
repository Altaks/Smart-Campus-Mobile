import Recommandation from "../../../src/Components/Accueil/Recommandations/Recommandation.jsx";
import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";

const recommandation_data = [
    {
        "id": 1,
        "texte": "Il est recommandé de fermer les fenêtres si elle sont ouvertes et d'allumer le chauffage si ils sont éteints",
        "type": "temp",
        "min": 17
    },
    {
        "id": 2,
        "texte": "Il est recommandé d'ouvrir les fenêtres si elle sont fermées et d'éteindre le chauffage s'il est allumé",
        "type": "temp",
        "max": 21
    },
    {
        "id": 3,
        "texte": "Ouvrir les fenêtres et les portes pour faire circuler l'air dans la salle si possible",
        "type": "co2",
        "max": 1000
    },
    {
        "id": 4,
        "texte": "Ne pas rester trop longtemps dans la salle",
        "type": "co2",
        "max": 1500
    },
    {
        "id": 5,
        "texte": "Evacuer la salle",
        "type": "co2",
        "max": 2000
    },
    {
        "id": 6,
        "texte": "Ouvrir les fenêtres s'il ne pleut pas dehors sinon fermer les fenêtres et ouvrir les portes",
        "type": "hum",
        "max": 50
    },
    {
        "id": 7,
        "texte": "S'il pleut dehors, ouvrir les fenêtres légèrement sinon ouvrir complètement les fenetres et ouvrir les portes",
        "type": "hum",
        "min": 30
    }
]

const donnees_data = [
    {
        "unite": "temp",
        "min": 17
    },
    {
        "unite": "temp",
        "max": 21
    },
    {
        "unite": "co2",
        "max": 1000
    },
    {
        "unite": "co2",
        "max": 1500
    },
    {
        "unite": "co2",
        "max": 2000
    },
    {
        "unite": "hum",
        "max": 50
    },
    {
        "unite": "hum",
        "min": 30
    }
]

describe("Test du composent Recommandation", () => {

    for(let i = 0; i < recommandation_data.length; i++) {
        it(`Doit afficher le texte du recommandation n°${i}`, async () => {
            render(<Recommandation recommandationId={i} unite={donnees_data[i]['unite']} max={donnees_data[i]['max']} min={donnees_data[i]['min']} type={donnees_data[i]['unite']} texte={recommandation_data[i]['texte']} salleId={1}/>)
            expect(screen.getByText(recommandation_data[i]['texte'])).toBeInTheDocument()
        });
    }
})