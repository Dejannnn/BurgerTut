import * as actionType from './actionType';
import axios from '../../axios-orders';
import {FETCH_INGIRIDENTS_FILED} from "./actionType";
export const addIngridents = (name) => {

    return {
        type: actionType.ADD_INGRIDIENT,
        ingrideintName: name
    }
};

export const removeIngridents = (name) => {

    return {
        type: actionType.REMOVE_INGRIDIENT,
        ingrideintName: name
    }
};

const setIngridients = (ingrideints) => {

    return {
             type: actionType.SET_INGRIDIENTS,
             ingrideints: ingrideints,
             purchasing:true
           }
};

const fethIngridientsFailed = () => {
    return {type: FETCH_INGIRIDENTS_FILED}
};

export const initIngrident= () => {

    return (dispatch) => {
              axios.get('https://burgerking-52a90.firebaseio.com/ingridients.json')
                .then(response => {
                    dispatch(setIngridients(response.data));
                })
                .catch(error => {
                    dispatch(fethIngridientsFailed());
                });
        } ;
};
