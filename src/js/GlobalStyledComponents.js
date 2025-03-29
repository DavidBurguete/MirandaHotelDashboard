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

export const Filters = styled.div`
    display: flex;
    margin: 1rem;
`;

export const Filter = styled.p`
    padding: 1rem 1.5rem;
    border-bottom: ${({$filter}) => $filter ? "3px solid #135846B0" : "2px solid #6E6E6E70"};
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: ${({$filter}) => $filter ? "#135846" : "#6E6E6E"};
    cursor: pointer;
`;

export const TableActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;