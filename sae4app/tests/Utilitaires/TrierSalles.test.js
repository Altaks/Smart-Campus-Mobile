import { expect, test } from 'vitest'
import trierSalles from './../../src/Utilitaires/TrierSalles.js'

test('trier les salles avec les salles vide', () => {
    const salles = []
    const sallesTrieesAttendues = []
    const sallesTriees = trierSalles(salles)
    expect(sallesTriees).toEqual(sallesTrieesAttendues)
})

test('trier les salles avec une seule salle', () => {
    const salles = [
        {
            id: 1,
            nom: "Salle 1"
        }
    ]
    const sallesTrieesAttendues = [
        {
            id: 1,
            nom: "Salle 1",
            idSallePrecedente: null,
            idProchaineSalle: null
        }
    ]
    const sallesTriees = trierSalles(salles)
    expect(sallesTriees).toEqual(sallesTrieesAttendues)
})

test('trier les salles avec plusieurs salles', () => {
  const salles = [
      {
          id: 2,
          nom: "Salle 2"
      },
      {
          id: 1,
          nom: "Salle 1"
      },
      {
          id: 3,
          nom: "Salle 3"
      }
  ]
  const sallesTrieesAttendues = [
        {
            id: 1,
            nom: "Salle 1",
            idSallePrecedente: null,
            idProchaineSalle: 2
        },
        {
            id: 2,
            nom: "Salle 2",
            idSallePrecedente: 1,
            idProchaineSalle: 3
        },
        {
            id: 3,
            nom: "Salle 3",
            idSallePrecedente: 2,
            idProchaineSalle: null
        }
    ]
    const sallesTriees = trierSalles(salles)
    expect(sallesTriees).toEqual(sallesTrieesAttendues)
})

test('trier les salles avec deux salles qui ont le même nom', () => {
    const salles = [
        {
            id: 2,
            nom: "Salle 1"
        },
        {
            id: 1,
            nom: "Salle 1"
        }
    ]
    const sallesTrieesAttendues = [
        {
            id: 2,
            nom: "Salle 1",
            idSallePrecedente: null,
            idProchaineSalle: 1
        },
        {
            id: 1,
            nom: "Salle 1",
            idSallePrecedente: 2,
            idProchaineSalle: null
        }
    ]
    const sallesTriees = trierSalles(salles)
    expect(sallesTriees).toEqual(sallesTrieesAttendues)
})