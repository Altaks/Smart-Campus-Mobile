import {cleanup, render, renderHook, screen, waitFor} from '@testing-library/react';
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {getConseils} from "../../src/Services/ApiPlatform/GetConseils.js";
import ListeConseils from "../../src/Routes/ListeConseils.jsx";

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
    }
]

const mockedFetchImplementation = () => Promise.resolve({
    json() {
        return data
    }
});

describe("Test du composant ListeConseils", () => {

    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(mockedFetchImplementation)

    it("Doit récupérer des données mockées", async () => {
        const temp_data = await getConseils();
        expect(temp_data.length).toEqual(data.length)
        expect(temp_data).toEqual(data)
    });

    it("Doit afficher le texte par défaut", async () => {
        render(<ListeConseils/>);
        expect(screen.getByText('Chargement des conseils ...')).toBeInTheDocument();
    });

    it("Doit afficher les titres", async () => {
        render(<ListeConseils/>);
        await waitFor(() => {
            expect(screen.getByText('Conseils Température')).toBeInTheDocument();
            expect(screen.getByText('Conseils Humidité')).toBeInTheDocument();
            expect(screen.getByText('Conseils CO2')).toBeInTheDocument();
        })
    });

    it("Doit afficher les textes mockés", async () => {
        render(<ListeConseils/>);
        await waitFor(() => {
            for(let i = 0; i < data.length; i++) {
                expect(screen.getByText(data[i]['texte'])).toBeInTheDocument();
            }
        })
    });

    it("Doit afficher les sources", async () => {
        render(<ListeConseils/>);
        await waitFor(() => {
            expect(screen.getByText("Sources :")).toBeInTheDocument();
            expect(screen.getByText("Conseils définis par le personnel")).toBeInTheDocument();
        })
    });


});