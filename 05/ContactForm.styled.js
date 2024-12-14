import styled from 'styled-components';

export const FormWrapper = styled.div`
    padding: 40px;
    max-width: 500px;
    margin: 60px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FieldWrapper = styled.div`
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    &:focus {
        border-color: #0077cc;
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    &:focus {
        border-color: #0077cc;
    }
`;

export const ErrorText = styled.span`
    display: block;
    color: red;
    margin-top: 5px;
`;

export const Button = styled.button`
    padding: 10px 15px;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #005fa3;
    }
`;
