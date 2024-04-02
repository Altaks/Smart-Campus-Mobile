import {expect, describe, it, vi} from "vitest"
import Accueil from "../../src/Routes/Accueil.jsx"
import {render} from "@testing-library/react"

const salles = [
    {
        "id": 1,
        "nom": "Salle 1",
        "systemesAcquisitions": [
            {
                "baseDeDonnees": "sae34bdm1eq1"
            }
        ]
    },
    {
        "id": 2,
        "nom": "Salle 2",
        "systemesAcquisitions": [
            {
                "baseDeDonnees": "sae34bdm1eq2"
            }
        ]
    },
    {
        "id": 3,
        "nom": "Salle 3",
        "systemesAcquisitions": [
            {
                "baseDeDonnees": "sae34bdm1eq3"
            }
        ]
    }
]

const data = [
    {
        "dateCapture": "2021-10-01T00:00:00+02:00",
        "id": 1,
        "value": 20,
        "nom": "temp"
    }
]

const mockedFetcSalle = () => Promise.resolve({
    json() {
        return salles
    }
})

const mockedFetchCapturesInterval = () => Promise.resolve({
    json() {
        return data
    }
})

describe("Test du composant Accueil", () => {

    it('Doit afficher un logo', () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<Accueil />)
        expect(document.documentElement).toContainHTML('img')
    })

    it('Doit afficher un titre', () => {
        window.fetch = vi.fn(mockedFetcSalle)
        render(<Accueil />)
        expect(document.documentElement).toContainHTML('h1')
        expect(document.querySelector('h1').textContent).toEqual("Quelle salle voulez vous consulter ?")
    })

})