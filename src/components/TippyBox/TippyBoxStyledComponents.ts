import styled from "styled-components";

export const Box = styled.div`
    max-width: 20rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #135846;
    color: white;
`;

export const Separator = styled.hr`
    margin-block: 0.75rem;
    border: 1px solid #458A78;
`;

export const Type = styled.h1`
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 1.25rem;

`;

export const Text = styled.p`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 1rem;
`;

export const Strikethrough = styled(Text)`
    color: red;
    text-decoration: line-through;
`;

export const Amenities = styled.ul`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 1rem;
    list-style: none;
`;