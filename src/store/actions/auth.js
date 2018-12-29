import * as actionTypes from './actionType';
import axios from '../../axios-orders';
import {apiKey} from "../../secret/secrets";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,

    };
};
export const setAuthRedirectPath = (path) => {

    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }

}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout= () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
           dispatch(logout());
        }, expirationTime *1000)
    }
}
export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email: email, password: password, returnSecureToken: true}
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

        if (isSingup) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
        }
        axios.post(url, authData)
            .then(result => {

                dispatch(authSuccess(result.data.idToken,result.data.localId))
                dispatch(checkTimeOut(result.data.expiresIn));
            })
            .catch(error => {

                dispatch(authFail(error.response.data.error));
            })
    }
}
