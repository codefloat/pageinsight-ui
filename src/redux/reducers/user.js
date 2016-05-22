import constants from '../constants/index'
import assign from 'object-assign'


let initialState = {}

export default function(state = initialState, action){
    let payload = action.payload;
    let type = action.type
    let nstate = {}
    switch(type){
        case constants.LOGGED_IN_USER:
            nstate = assign({}, state, payload.user);
            console.log('nstate', nstate)
            return nstate;
        break;

        default:
        // do nothing
    }

    return state
}
