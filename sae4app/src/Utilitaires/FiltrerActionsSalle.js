const filtrerActionsSalle = (actions, salleId) => {
    const curTimestamp = new Date().getTime()
    const maxTime = 5 * 60 * 1000 // 5 minutes
    return actions.filter(action => {
        return action.salle.id === salleId &&
            new Date(action.datetime).getTime() >= curTimestamp - maxTime
    })
}

export default filtrerActionsSalle