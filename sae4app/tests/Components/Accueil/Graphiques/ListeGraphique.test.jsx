import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import formalisationDonnees from "../../../../src/Utilitaires/FormalisationDonnees.js";
import ListeGraphiques from "../../../../src/Components/Accueil/Graphiques/ListeGraphiques.jsx";

const dateCapture = new Date()

const data = [
    {
        "id": 44661,
        "nom": "temp",
        "valeur": "22.1",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44662,
        "nom": "hum",
        "valeur": "56.9",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44663,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44664,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44665,
        "nom": "temp",
        "valeur": "23.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44666,
        "nom": "hum",
        "valeur": "51.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44667,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44668,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44669,
        "nom": "temp",
        "valeur": "24.0",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44670,
        "nom": "hum",
        "valeur": "50.6",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44671,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44672,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44673,
        "nom": "temp",
        "valeur": "24.2",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44674,
        "nom": "hum",
        "valeur": "50.0",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44675,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44676,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44677,
        "nom": "temp",
        "valeur": "24.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44678,
        "nom": "hum",
        "valeur": "49.5",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44679,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44680,
        "nom": "pres",
        "valeur": "true",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44681,
        "nom": "temp",
        "valeur": "25.1",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44682,
        "nom": "hum",
        "valeur": "48.0",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44683,
        "nom": "co2",
        "valeur": "428",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44684,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44685,
        "nom": "temp",
        "valeur": "25.2",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44686,
        "nom": "hum",
        "valeur": "47.7",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44687,
        "nom": "co2",
        "valeur": "431",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44688,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44689,
        "nom": "temp",
        "valeur": "24.6",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44690,
        "nom": "hum",
        "valeur": "49.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44691,
        "nom": "co2",
        "valeur": "411",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44692,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44693,
        "nom": "temp",
        "valeur": "24.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44694,
        "nom": "hum",
        "valeur": "49.6",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44695,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44696,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44697,
        "nom": "temp",
        "valeur": "25.0",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44698,
        "nom": "hum",
        "valeur": "48.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44699,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44700,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44701,
        "nom": "temp",
        "valeur": "24.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44702,
        "nom": "hum",
        "valeur": "50.0",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44703,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44704,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44705,
        "nom": "temp",
        "valeur": "24.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44706,
        "nom": "hum",
        "valeur": "50.1",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44707,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44708,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44709,
        "nom": "temp",
        "valeur": "24.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44710,
        "nom": "hum",
        "valeur": "49.2",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44711,
        "nom": "co2",
        "valeur": "405",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44712,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44713,
        "nom": "temp",
        "valeur": "24.7",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44714,
        "nom": "hum",
        "valeur": "49.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44715,
        "nom": "co2",
        "valeur": "414",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44716,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44717,
        "nom": "temp",
        "valeur": "22.2",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44718,
        "nom": "hum",
        "valeur": "57.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44719,
        "nom": "co2",
        "valeur": "416",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44720,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44721,
        "nom": "temp",
        "valeur": "22.3",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44722,
        "nom": "hum",
        "valeur": "57.1",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44723,
        "nom": "co2",
        "valeur": "434",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44724,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44725,
        "nom": "temp",
        "valeur": "22.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44726,
        "nom": "hum",
        "valeur": "56.3",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44727,
        "nom": "co2",
        "valeur": "401",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44728,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44729,
        "nom": "temp",
        "valeur": "22.8",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44730,
        "nom": "hum",
        "valeur": "56.4",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44731,
        "nom": "co2",
        "valeur": "405",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44732,
        "nom": "pres",
        "valeur": "false",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44733,
        "nom": "temp",
        "valeur": "22.7",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44734,
        "nom": "hum",
        "valeur": "56.6",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44735,
        "nom": "co2",
        "valeur": "400",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    },
    {
        "id": 44736,
        "nom": "pres",
        "valeur": "true",
        "dateCapture": dateCapture.toISOString(),
        "localisation": "C005",
        "description": "",
        "nomsa": "ESP-018"
    }
]

const transformedData = formalisationDonnees(data);

describe("Test du composant ListeGraphique ", () => {

    it("Les données mockées sont transformées correctement", () => {
        expect(formalisationDonnees(data)).not.toBeNull();
        expect(formalisationDonnees(data)).not.toBeUndefined();
    });

    it('Doit afficher le texte par défaut d\'indication de la dernière capture', async () => {
        render(<ListeGraphiques donnes={transformedData}/>);
        expect(document.documentElement).toContainHTML('Dernière capture à');
    });

    it('Doit afficher les trois graphiques', async () => {
        render(<ListeGraphiques donnes={transformedData}/>);
        expect(document.documentElement).toContainHTML('Température');
        expect(document.documentElement).toContainHTML('Humidité');
        expect(document.documentElement).toContainHTML('Qualité de l\'air');
    });

    it('Doit retourner un fragment vide si les données sont vides', async () => {
      render(<ListeGraphiques donnes={undefined}/>)
        expect(document.documentElement).toContainHTML('<div/>')
    })
});