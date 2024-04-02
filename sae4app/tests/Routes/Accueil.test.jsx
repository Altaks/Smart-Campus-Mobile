import {cleanup, render, screen} from '@testing-library/react';
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import Recommandation  from "../../src/Components/Accueil/Recommandations/Recommandation.jsx";

describe("Test du composant Recommandation", () => {

    const id = 1;
    const type = "temp";
    const texte = "Température trop basse";
    const min = 18;
    const max = null;
    const unite = "°C";

    beforeEach(() => {
        render(<Recommandation id={id} type={type} texte={texte} min={min} max={max} unite={unite}/>);
    })

    it ("Doit afficher la recommandation Température trop basse", () => {
        expect(screen.getByText("Température trop basse")).toBeInTheDocument();
    })

    it ("Doit afficher 18°C", () => {
        expect(screen.getByText("18°C")).toBeInTheDocument();
    })
});