const redux= require('redux');
const createStore= redux.createStore;

const inintState={counter: 0}

//Reducer
const rootReducer= (state= inintState, action) => {

    if(action.type=== 'INC_COUNTER'){

        const ss=state;
        console.log('SS',ss);
        return {
            ...state, counter: state.counter+1
        }
    }
    if(action.type=== 'ADD_COUNTER'){
        return {...state , counter: action.value }
    }
    return state
}

//Store
const store=createStore(rootReducer)
console.log(store.getState())
//Action

store.dispatch({type:'ADD_COUNTER', value: 10});
store.dispatch({type:'INC_COUNTER'});

console.log(store.getState())
//Substacin