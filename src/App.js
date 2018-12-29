import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
    render() {
        let routes= (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/' />
            </Switch>
            )
            if(this.props.isAuth){
                routes = (
                    <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                   </Switch> )
            }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}
const mapStateToProp= (state) => {

    return {
        isAuth: state.auth.token !== null
    }
}
export default withRouter(connect(mapStateToProp)(App));
