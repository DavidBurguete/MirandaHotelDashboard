import styled from "styled-components";

export const PendingReviews = styled.div`
    margin-bottom: 2rem;
    padding: 1.875rem;
    border-radius: 1.25rem;
    background-color: white;
`;

export const PRHeader = styled.p`
    padding-bottom: 1.5rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 1.25rem;
    color: #393939;
`;

export const CommentHeader = styled(PRHeader)`
    font-size: 1rem;
    font-weight: 600;
`;

export const Message = styled.div`
    padding: 1.25rem;
    border: 1px solid #EBEBEB;
    border-radius: 1.25rem;
    transition: 200ms;

    &:hover{
        box-shadow: 0px 16px 30px #00000014;
    }
`;

export const Comment = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: #4E4E4E;
`;

export const UserArchiveWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const User = styled.p`
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    line-height: 4.5rem;
`;