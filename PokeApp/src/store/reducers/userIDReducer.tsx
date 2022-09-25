/**
 * Reducer for the user ID.
 */

const initialState = { userID: 'me' }

function setCurrentUserID(state = initialState, action: { type: string, value: any }) {

    let nextState;
    switch (action.type) {
        case 'SET_USER_ID':
            nextState = {
                ...state,
                userID: action.value,
            };
            console.log('[STORE] Change the User ID: ', action.value)
            return nextState || state;
        default:
            return state;
    }
}

export default setCurrentUserID;