// withState Utility!
// share state between components with unstated, use as such:
// import withState from App/State
// export default withState(YourComponent, 'someStateContainer')
// now you can find the state variables from someStateContainer in this.props for YourComponent

// add imports here as such:
// import someStateContainer from ./someStateContainer
import withState from './withState'

export const stateContainers = {
    // someStateContainer
}

export default withState
