import * as actionTypes from './actionType';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {

 return {
     type: actionTypes.PURCHASE_BURGER_SUCCESS,
     orderId: id,
     orderData: orderData
 };
};

const purchaseBurgerFail = (error) => {

    return {
        type:actionTypes.FETCH_INGIRIDENTS_FILED,
        error: error
    };
};

const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START}
};

export const purchaseBurger= (orderData,token) => {

    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/order.json?auth='+ token, orderData )
            .then( response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error))
            } );
    };
};

export const purchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }

};
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
};

export const fetchOrdersStart = () => {

    return {
        type: actionTypes.FETCH_ORDERS_START

    }

};

export const fetchOrders= (token, userId) => {

    return dispatch => {
        dispatch(fetchOrdersStart());
        console.log(userId);
        const query= '?auth='+token+'&orderBy="userId"&equalTo="' + userId +'"';
      console.log(query)
        axios.get('/order.json'+ query)
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            });
    }
};