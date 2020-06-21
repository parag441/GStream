import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({ error, touched }) => {  //touched is true when we deselect input after selecting it
        if (touched && error ) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderField = ({ input, label, meta, type }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={label} type={type} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form 
                className="ui form error" 
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field 
                    name="title"
                    type="text"
                    component={this.renderField}
                    label="Title"
                />
                <Field 
                    name="description"
                    type="text"
                    component={this.renderField}
                    label="Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }  
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title) {
        errors.title = "You must enter a title";
    }

    if(!formValues.description) {
        errors.description = "You musr enter a description";
    }
    
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);