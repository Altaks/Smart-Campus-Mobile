import {render, screen, waitFor} from "@testing-library/react"
import {expect, describe, it, vi} from "vitest"
import PageApiIndisponible from "../../src/Components/PageApiIndisponible.jsx"
import {apiDisponible} from "../../src/Services/ApiPlatform/ApiDisponible.js";

const message = {
    "message": "L'API est indisponible."
}

const error = TypeError( "Failed to fetch")

const mockedFetchApiDisponible = () => Promise.resolve({
    json() {
        return message
    }
});

const mockedFetchApiIndisponible = () => Promise.reject(error);

describe('Test de la composant PageApiIndisponible', () => {

    it("Doit verifier que l'api est disponible", async () => {
        window.fetch = vi.fn(mockedFetchApiDisponible)
        const data = await apiDisponible()
        expect(data).toEqual(message)
    })

    it("Doit verifier que l'api est indisponible", async () => {
        window.fetch = vi.fn(mockedFetchApiIndisponible)
        apiDisponible().catch((err) => {
            expect(err).toEqual(error)
        })
    })

    it("Doit afficher le texte par défaut", async () => {
        render(<PageApiIndisponible/>)
        expect(screen.getByText('Désolé les informations ne sont pas disponibles.')).toBeInTheDocument()
    })

    it("Doit afficher le texte de contact", async () => {
        render(<PageApiIndisponible/>)
        expect(screen.getByText("Si le problème persiste contactez nous par mail à l'adresse kevin.simon@etudiant.univ-lr.fr.")).toBeInTheDocument()
    })

    it("Doit afficher le logo", async () => {
        render(<PageApiIndisponible/>)
        expect(screen.getByAltText('Smart Campus')).toBeInTheDocument()
    })

    it("Doit verifier que la page est visible", async () => {
        window.fetch = vi.fn(mockedFetchApiDisponible)
        render(<PageApiIndisponible/>)
        await waitFor(() => {
            expect(document.getElementById('apiIndisponible').classList).toContain('top-0')
        })
    })

    it("Doit verifier que la page est au dessus de l'espace visible", async () => {
        window.fetch = vi.fn(mockedFetchApiIndisponible)
        render(<PageApiIndisponible/>)
        await waitFor(() => {
            expect(document.getElementById('apiIndisponible').classList).toContain('-top-[100vh]')
        })
    })

    it("Doit vérifier que la vérification de l'api est appelée toute les 5 secondes", async () => {
        window.fetch = vi.fn(mockedFetchApiDisponible)
        vi.useFakeTimers()
        vi.spyOn(window, 'setTimeout')
        render(<PageApiIndisponible/>)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
    })
})