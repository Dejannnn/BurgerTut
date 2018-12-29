import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import * as actionsOrderCreators from '../../../store/actions/index'
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderFrom: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false

            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'chipest', displayValue: 'Chipest'},
                    ],

                },
                value: '',
                validation: {
                    required: true
                }
            },
        },
    }

    checkValidatity(value, rules) {

        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIndetifier in this.state.orderFrom) {
            formData[formElementIndetifier] = this.state.orderFrom[formElementIndetifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    };
    inputChangedHandler = (event, inputIndentifer) => {
        const updateOrederForm = {
            ...this.state.orderFrom
        };
        const updateFormElement = {
            ...updateOrederForm[inputIndentifer]
        }

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidatity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrederForm[inputIndentifer] = updateFormElement;
        this.setState({orderFrom: updateOrederForm});

    };

    render() {
        const fromElementsArray = [];
        for (let key in this.state.orderFrom) {
            fromElementsArray.push(
                {id: key, config: this.state.orderFrom[key]})
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    fromElementsArray.map(valueElements => {
                        return ( <Input key={valueElements.id}
                                        elementtype={valueElements.config.elementType}
                                        elementConfig={valueElements.config.elementConfig}
                                        value={valueElements.config.value}
                                        shouldValidate={valueElements.config.validation}
                                        invalid={!valueElements.config.valid}
                                        isTouched={valueElements.config.touched}

                                        changed={(event) => this.inputChangedHandler(event, valueElements.id)}/>
                        )
                    })}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        onOrderBurger: (orderData,token) => {
            dispatch(actionsOrderCreators.purchaseBurger(orderData,token))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));