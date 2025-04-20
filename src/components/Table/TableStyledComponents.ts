import styled from "styled-components";

export const TableTag = styled.table`
    border-radius: 1.25rem;
    width: 100%;
    background-color: white;
`;
export const THead = styled.thead`
    text-align: left;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.125rem;
    color: #393939;
`;
export const TBody = styled.tbody``;
export const TR = styled.tr``;
export const TH = styled.th`
    padding: 1.5rem;
    cursor: default;
`;

export const THSort = styled(TH)<{
    $as_button: boolean;
}>`
    cursor: ${({$as_button}) => $as_button ? "pointer" : "default"};
`;