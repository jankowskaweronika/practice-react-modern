import React, { useReducer } from 'react';
import {
    Button,
    FormWrapper,
    Input,
    Label,
    Textarea,
    FieldWrapper,
    ErrorText,
} from './ContactForm.styled';
import formFields from './formFields';

const initialState = {
    nameAndSurname: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
    submitMessage: '',
    errors: {},
    tryToSubmit: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.error } };
        case 'SET_ERRORS':
            return { ...state, errors: { ...action.payload } };
        case 'SET_SUBMIT_MESSAGE':
            return { ...state, submitMessage: action.message };
        case 'RESET_FIELDS':
            return { ...initialState, errors: {} };

        default:
            return state;
    }
};

const ContactForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_FIELD', field: name, value });

        if (state.triedToSubmit) {
            const fieldConfig = formFields.find((field) => field.name === name);
            if (fieldConfig) {
                if (fieldConfig.required && !value.trim()) {
                    dispatch({
                        type: 'SET_ERROR',
                        field: name,
                        error: `${fieldConfig.label} is required.`,
                    });
                } else if (fieldConfig.regex && !fieldConfig.regex.test(value)) {
                    dispatch({ type: 'SET_ERROR', field: name, error: fieldConfig.errorMessage });
                } else {
                    dispatch({ type: 'SET_ERROR', field: name, error: '' });
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let allValid = true;
        const errors = {};
        formFields.forEach((field) => {
            if (field.required && !state[field.name].trim()) {
                allValid = false;
                errors[field.name] = `${field.label} is required.`;
            } else if (field.regex && !field.regex.test(state[field.name])) {
                allValid = false;
                errors[field.name] = field.errorMessage;
            }
        });

        if (allValid) {
            dispatch({ type: 'RESET_FIELDS' });
            dispatch({ type: 'SET_SUBMIT_MESSAGE', message: 'Form data submitted successfully!' });
        } else {
            dispatch({ type: 'SET_SUBMIT_MESSAGE', message: '' });
            dispatch({ type: 'SET_ERRORS', payload: errors });
            dispatch({ type: 'SET_FIELD', field: 'triedToSubmit', value: true });
        }
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit} noValidate>
                {formFields.map((field) => (
                    <FieldWrapper key={field.name}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        {field.type !== 'textarea' ? (
                            <Input
                                type={field.type}
                                name={field.name}
                                value={state[field.name]}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <Textarea
                                name={field.name}
                                value={state[field.name]}
                                onChange={handleInputChange}
                            />
                        )}
                        <ErrorText>{state.errors[field.name]}</ErrorText>
                    </FieldWrapper>
                ))}
                <Button type="submit">Submit</Button>
            </form>
            {state.submitMessage && <p>{state.submitMessage}</p>}
        </FormWrapper>
    );
};

export default ContactForm;