import styled from "styled-components";
import { RxCrossCircled } from "react-icons/rx";

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
    display: flex;
`;

export const TableImg =styled.img`
    width: 9.25rem;
    border-radius: 0.5rem;
`;

export const DivText = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
    padding-inline: 3rem;
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

const Price = styled.div`
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: #393939;

    span{
        font-weight: 400;
        font-size: 0.875rem;
        color: #799283;
    }
`;

export const PriceTD = styled(Price).attrs({
    as: 'td'
})``;

export const PriceP = styled(Price).attrs({
    as: 'p'
})``;

export const PreviousPriceP = styled(Price).attrs({
    as: 'p'
})`
    color: #E23428;
    text-decoration: line-through;

    span{
        color: inherit;
    }
`;

export const CrossCircled = styled(RxCrossCircled)`
    margin-left: 2rem;
    font-size: 1.5rem;
    color: red;
    vertical-align: middle;
    cursor: pointer;
`;