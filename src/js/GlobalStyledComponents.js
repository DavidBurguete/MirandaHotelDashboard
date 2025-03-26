import styled from "styled-components";

export const Button = styled.button`
    margin-block: 1rem;
    padding: 0.875rem 2.5rem;
    max-width: 10rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: ${props => props.$background ? props.$background : "white"};
    color: ${props => props.$color ? props.$color : "black"};
`;