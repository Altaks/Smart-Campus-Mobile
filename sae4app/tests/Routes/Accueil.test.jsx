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

const mockedFetcSalle = () => Promise.resolve({
    json() {
        return salles
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