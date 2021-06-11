const initialState = {
    signInPopup: false,
    signUpPopup: false
}

const appSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIGNIN_POPUP': {
            return {
                ...state,
                signInPopup: !state.signInPopup
            }
        }
        case 'TOGGLE_SIGNUP_POPUP': {
            return {
                ...state,
                signUpPopup: !state.signUpPopup
            }
        }
        default:
            return state;
    }
}

export default appSettingsReducer;