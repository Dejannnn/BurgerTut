import * as actionsType from '../actions/actionType';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const reducers = (state = initialState, action) => {

    switch (action.type) {
        case (actionsType.ADD_INGRIDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingrideintName]: state.ingredients[action.ingrideintName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingrideintName],
                building: true
            };
        case (actionsType.REMOVE_INGRIDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingrideintName]: state.ingredients[action.ingrideintName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingrideintName],
                building: true
            };
        case (actionsType.SET_INGRIDIENTS):
            console.log(action.ingrideints);
            return {
                ...state,
                ingredients: action.ingrideints,
                totalPrice: 4,
                error: false,
                building: false
            }
        case (actionsType.FETCH_INGIRIDENTS_FILED):
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }


};
export default reducers;