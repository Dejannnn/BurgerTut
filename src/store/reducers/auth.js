import * as actionsType from '../actions/actionType';

const initialState = {
    email: null,
    password: null,
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
};

const reducers = (state = initialState, action) => {

    switch (action.type) {
        case (actionsType.AUTH_START):
            console.log(action);
            return {
                ...state,
                error: null, loading: true
            }
        case (actionsType.AUTH_SUCCESS):
            console.log(action);
            return {
                ...state,
                token: action.idToken,
                error: null,
                loading: false,
                userId: action.userId
            }
        case (actionsType.AUTH_FAIL):
            return {
                error: action.error,
                loading: false
            };
        case (actionsType.AUTH_LOGOUT):
            return {...initialState}
        case (actionsType.SET_AUTH_REDIRECT_PATH):
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }


};
export default reducers;