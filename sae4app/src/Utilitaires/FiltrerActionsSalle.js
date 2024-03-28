const filtrerActionsSalle = (actions, salleId) => {
    return actions.filter(action => {
        return action.salle.id === salleId
    })
}

export default filtrerActionsSalle