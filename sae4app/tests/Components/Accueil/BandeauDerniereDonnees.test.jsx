import {render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import BandeauDerniereDonnees from "../../../src/Components/Accueil/BandeauDerniereDonnees.jsx";

const emptyData = [null, null, null];

const testData = [
    [20, 50, 1000],
    [21, 51, 1001],
    [22, 52, 1002],
    [23, 53, 1003],
    [24, 54, 1004],
    [25, 55, 1005],
];

describe('Test du composant BandeauDerniereDonnees', () => {

    it('Doit afficher le texte par défaut', async () => {
        render(<BandeauDerniereDonnees derniereDonnees={emptyData} isDisplayed={true}/>);
        expect(screen.getByText('Température : Pas de données')).toBeInTheDocument();
        expect(screen.getByText('Humidité : Pas de données')).toBeInTheDocument();
        expect(screen.getByText('CO2 : Pas de données')).toBeInTheDocument();
    });

    for(let i = 0; i < testData.length; i++) {
        it(`Doit afficher les données correctement pour le groupe de données ${i}`, async () => {
            render(<BandeauDerniereDonnees derniereDonnees={testData[i]} isDisplayed={true}/>);
            expect(screen.getByText(`Température : ${testData[i][0]}°C`)).toBeInTheDocument();
            expect(screen.getByText(`Humidité : ${testData[i][1]}%`)).toBeInTheDocument();
            expect(screen.getByText(`CO2 : ${testData[i][2]} ppm`)).toBeInTheDocument();
        });
    }

    it('Doit ne pas afficher le bandeau si isDisplaied est faux', async () => {
        render(<BandeauDerniereDonnees derniereDonnees={testData[0]} isDisplayed={null}/>);
        expect(screen.queryByText('Température : Pas de données')).toBeNull();
        expect(screen.queryByText('Humidité : Pas de données')).toBeNull();
        expect(screen.queryByText('CO2 : Pas de données')).toBeNull();
    });



});