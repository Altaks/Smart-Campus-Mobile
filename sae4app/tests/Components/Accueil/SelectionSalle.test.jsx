import {expect, describe, it, vi} from "vitest"
import SelectionSalle from "../../../src/Components/Accueil/SelectionSalle.jsx";
import {render, waitFor} from "@testing-library/react";

const salles = [
    {
        "id": 1,
        "nom": "Salle 1"
    },
    {
        "id": 2,
        "nom": "Salle 2"
    },
    {
        "id": 3,
        "nom": "Salle 3"
    }
]

const mockedFetcSalle = () => Promise.resolve({
    json() {
        return salles
    }
});


describe("Test du composant SelectionSalle", () => {

    it('Doit vérifier qu un select permettant de choisir une salle est affiché', () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<SelectionSalle handleChoixSalle={() => {}} salle={{}} setSalle={() => {}}/>)
        expect(document.documentElement).toContainHTML('select')
    })

    it('Doit vérifier que des fleches permettant de changer de salle sont affichées', () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<SelectionSalle handleChoixSalle={() => {}} salle={{}} setSalle={() => {}}/>)
        expect(document.querySelectorAll('img').length).toEqual(2)
    })

    it('Doit vérifier que les fleches permettant de changer de salle sont cliquables', () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<SelectionSalle handleChoixSalle={() => {}} salle={{}} setSalle={() => {}}/>)
        document.getElementById("SallePrecedente").click()
        document.getElementById("ProchaineSalle").click()
    })

    it('Doit vérifier que le select permettant de choisir une salle est cliquable', async () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<SelectionSalle handleChoixSalle={() => {}} salle={{}} setSalle={() => {}}/>)
        document.querySelector('select').click()
    })

    it('Doit vérifier que le select contient bien les salles', async () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<SelectionSalle handleChoixSalle={() => {}} salle={{}} setSalle={() => {}}/>)
        expect(document.querySelector('select').children.length).toEqual(1)
        await waitFor(() => {
            expect(document.querySelector('select').children.length).toEqual(4)
        })
    })
})