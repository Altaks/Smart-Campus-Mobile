import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import Conseil from "../../../src/Components/ListeConseils/Conseil.jsx"

const data = [
    {
        "id": 1,
        "texte": "En période normale, il est recommandé de maintenir une température de 19°C dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. Laissez les portes ouvertes si possible pour faire circuler l'air.",
        "type": "temp",
        "max": 19
    },
    {
        "id": 2,
        "texte": "En période de fortes chaleurs, il est recommandé de maintenir une température inférieure à 26°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés et ouvrez les fenêtres en conséquence. Laissez les portes ouvertes si possible pour faire circuler l'air. Évitez d'utiliser la climatisation le plus possible",
        "type": "temp",
        "max": 26
    },
    {
        "id": 3,
        "texte": "En période d'inoccupation faible (entre 24 et 48h) , il est recommandé de maintenir une température maximale de à 16°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.",
        "type": "temp",
        "max": 16
    },
    {
        "id": 4,
        "texte": "En période d'inoccupation forte (supérieure à 48h), il est recommandé de maintenir une température maximale de 8°C dans les salles de cours. Éteignez le chauffage s'ils sont allumés, laissez les portes ouvertes si possible pour faire circuler l'air dans le bâtiment.",
        "type": "temp",
        "max": 8
    },
    {
        "id": 5,
        "texte": "En période normale, il est recommandé de maintenir une température supérieure à 17°C dans les salles de cours. Éteignez les chauffages s'ils sont allumés et ouvrez les fenêtres si besoin. Allumez les chauffages si besoin, fermez les fenêtres et les portes pour conserver la chaleur.",
        "type": "temp",
        "min": 17
    },
    {
        "id": 6,
        "texte": "Au dessus d'un taux de CO2 de 1000 ppm, il est recommandé d'aérer les salles de cours. Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.",
        "type": "co2",
        "max": 1000
    },
    {
        "id": 7,
        "texte": "Au dessus d'un taux de CO2 de 2000 ppm, il est recommandé d'évacuer les salles de cours. Ouvrez les fenêtres ainsi que les portes pour faire circuler l'air dans l'intégralité du bâtiment.",
        "type": "co2",
        "max": 2000
    },
    {
        "id": 8,
        "texte": "Au dessus d'un taux de CO2 de 1500 ppm, il est recommandé d'aérer les salles de cours et de ne pas rester trop longtemps dans les salles concernées. Ouvrez les fenêtres et les portes si possible pour faire circuler l'air.",
        "type": "co2",
        "max": 1500
    },
    {
        "id": 9,
        "texte": "En période normale, il est recommandé de maintenir une humidité relative supérieure à 40% dans les salles de cours. Ouvrez légèrement les fenêtres si possible pour faire circuler l'air s'il pleut faiblement à l'extérieur dehors",
        "type": "hum",
        "min": 40
    },
    {
        "id": 10,
        "texte": "En période normale, il est recommandé de maintenir une humidité relative inférieure à 70% dans les salles de cours. Ouvrez les fenêtres si possible pour faire circuler l'air s'il ne pleut pas dehors, dans le cas contraire, fermez les fenêtres et changez de salle temporairement si possible.",
        "type": "hum",
        "max": 70
    }
]

describe("Test du composant Conseil", () => {

    for(let i = 0; i < data.length; i++) {
        it(`Doit afficher le texte du conseil n°${i}`, async () => {
            render(<Conseil recommandation={data[i]} index={0}/>)
            expect(screen.getByText(data[i]['texte'])).toBeInTheDocument()
        });
    }
});