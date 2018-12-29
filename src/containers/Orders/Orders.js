import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {


    componentDidMount() {

        this.props.onFetchOrders(this.props.token, this.props.userId);

    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = (  this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            )) )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId

    }

}
const mapDIspatchToProps = (dispatch) => {

    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token, userId))

    }

}

export default connect(mapStateToProps, mapDIspatchToProps)(withErrorHandler(Orders, axios));