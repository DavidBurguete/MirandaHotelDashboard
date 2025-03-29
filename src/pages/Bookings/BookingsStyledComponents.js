import styled from "styled-components";

export const TR = styled.tr`
    text-transform: capitalize;

    &>*{
        padding: 1.5rem;
    }
`;

export const TD = styled.td`
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: #393939;
`;

export const TDMoreContent = styled.td`
    display: table-cell;
    margin: auto 0;
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: #393939;
`;

export const ID = styled.p`
    font-weight: 400;
    font-size: 0.875rem;
    color: #799283;
`;