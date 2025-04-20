import styled from "styled-components";
import { Button } from "../../js/GlobalStyledComponents";
import { Comment } from "../../components/PendingReviews/PendingReviewsStyledComponents";

export const TD = styled.td`
    padding: 1.25rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: #393939;
`;

export const TDDate = styled(TD)`
    width: 10rem;
`;

export const TDHeader = styled.p`
    font-weight: 600;
`;

export const TDText = styled.p`
    font-size: 0.875rem;
    color: #799283;
`;

export const ArchiveButton = styled(Button)`
    text-transform: capitalize;
`;

export const NoPendingMessages = styled(Comment)`
    padding: 2rem;
    border-radius: 1.25rem;
    background-color: white;
    font-size: 2.5rem;
    text-align: center;
`;