import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {Redirect} from 'react-router-dom';
import clases from './Auth.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {

        controls: {

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Insert password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSingUp: true

    }

    componentDidMount() {

        if(!this.props.burgerBuilder && this.props.authRedirectPath){
           this.props.onSetAuthRedirectPath;
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidatity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    };
    onSingIn = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp);
    };
    switchAuthModeHandler = () => {

        this.setState((prevState) => {
            return {isSingUp: !prevState.isSingUp}
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                }
            )
        }
        let form = formElementsArray.map(valueElements => {
                return ( <Input key={valueElements.id}
                                elementtype={valueElements.config.elementType}
                                elementConfig={valueElements.config.elementConfig}
                                value={valueElements.config.value}
                                shouldValidate={valueElements.config.validation}
                                invalid={!valueElements.config.valid}
                                isTouched={valueElements.config.touched}
                                changed={(event) => this.inputChangedHandler(event, valueElements.id)}/>

                )
            }
        );
        if (this.props.loading) {
            form = <Spinner/>
        }


        let errorMessage = null;
        if (this.props.errorMessage !== null) {
            errorMessage = ( <p style={{color: 'red'}}>{this.props.errorMessage.message}</p>)
        }
        let authRedirect = null;

        if (this.props.token !== null) {
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={clases.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSingIn}>
                    {form}
                    <Button btnType="Success"> SUBMIT </Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}> SWITCH TO
                    SIGNIN {this.state.isSingUp ? 'SIGNIN' : "SIGNUP"}</Button>

            </div>
        )


    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        token: state.auth.token,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }

};
const mapDispatchToProps = dispatch => {

    return {
        onAuth: (email, password, isSingup) => dispatch(actions.auth(email, password, isSingup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);