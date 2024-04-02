import { expect, test } from 'vitest'
import filtrerActionsSalle from './../../src/Utilitaires/FiltrerActionsSalle.js'

test('filtrer une liste d actions vide en fonction dune salle', () => {
    const salleID = 4
    const actions = []
    const actionsFiltreesAttendues = []
    const actionsFiltrees = filtrerActionsSalle(actions, salleID)
    expect(actionsFiltrees).toEqual(actionsFiltreesAttendues)
})

test('filtrer une liste d actions en fonction dune salle', () => {
    const salleID = 4
    const datetime = new Date().toISOString()
    const actions = [
        {
            salle: {
                id: 4
            },
            datetime: datetime
        },
        {
            salle: {
                id: 5
            },
            datetime: datetime
        }
    ]
    const actionsFiltreesAttendues = [
        {
            salle: {
                id: 4
            },
            datetime: datetime
        }
    ]
    const actionsFiltrees = filtrerActionsSalle(actions, salleID)
    expect(actionsFiltrees).toEqual(actionsFiltreesAttendues)
})

test('filtrer une liste d actions en fonction dune salle et d un timestamp', () => {

})