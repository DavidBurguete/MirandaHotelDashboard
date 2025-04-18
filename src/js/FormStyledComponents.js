import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: #393939;
`;

export const Input = styled.input`
    margin-top: 0.5rem;
    padding: 1rem;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.5rem;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: #393939;
`;

export const InputCheckBox = styled(Input)`
    justify-self: flex-start;
    width: 1.25rem;
    height: 1.25rem;
`;

export const InputSubmit = styled(Input)`
    align-self: flex-end;
    margin: 1rem;
    padding: 1rem;
    width: 15rem;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.5rem;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: white;
    background-color: #135846;
    cursor: pointer;
`;