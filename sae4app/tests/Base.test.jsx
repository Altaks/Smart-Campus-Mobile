import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Base from "../src/Base.jsx";


describe('Test de fonctionnement de la librairie de test', () => {
    it('Doit retourner vrai', () => {
        expect(true).toBe(true);
    });
})

describe("Test du composant Base", () => {
    it("Doit afficher le lien Accueil", () => {
        render(<Base/>);
        expect(screen.getByText("Accueil")).toBeInTheDocument();
    });
})
