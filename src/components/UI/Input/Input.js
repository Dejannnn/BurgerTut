import React from 'react';
import clases from './Input.css'
const input = (props) => {

    let inputElement = null;
    const inputClases = [clases.InputElement];

    if (props.invalid && props.shouldValidate && props.isTouched) {
        inputClases.push(clases.Invalid);
    }
    switch (props.elementtype) {

        case ('input'):
            inputElement = <input
                className={inputClases.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={clases.InputElement}
                {...props.elementConfig}
                value={props.value}></textarea>;
            break;
        case ('select'):
            inputElement = <select
                className={clases.InputElement}
                onChange={props.changed}
                value={props.value}>

                {props.elementConfig.options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    )
                })}
            </select>;
            break;
        default:
            inputElement = <input
                className={clases.InputElement}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
            />
    }


    return (

        <div className={clases.Input}>
            <label className={clases.Label}>{props.label}</label>
            {inputElement}
        </div>

    );
};

export default input;