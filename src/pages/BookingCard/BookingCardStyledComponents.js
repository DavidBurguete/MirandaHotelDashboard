import styled from "styled-components";
import { Button } from "../../js/GlobalStyledComponents";

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
`;

export const CardTextWrapper = styled.div`
    padding: 2rem;
    border-top-left-radius: 1.25rem;
    border-bottom-left-radius: 1.25rem;
    background-color: white;
`;

export const Name = styled.p`
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.875rem;
    color: #212121;
`;

export const ID = styled.p`
    margin-block: 1rem 2rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 0.875rem;
    color: #799283;
`;

export const SameLineDataWrapper = styled.div`
    display: flex;

    &>*{
        width: 50%;
    }
`;

export const TextHeader = styled.p`
    padding-bottom: 1rem;
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.875rem;
    color: #6E6E6E;
`;

export const TextMain = styled.p`
    font-family: Poppins;
    font-weight: 500;
    font-size: 1.25rem;
    color: #212121;

    span{
        font-weight: 400;
        font-size: 0.875rem;
        color: #799283;
    }
`;

export const HR = styled.hr`
    margin-block: 2rem;
    border: 1px solid #EBEBEB;
`;

export const Description = styled.p`
    padding-block: 1.5rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 0.875rem;
    text-align: justify;
    color: #363636;
`;

export const AmenityCard = styled(Button)`
    margin: 0;
    margin-right: 1rem;
    text-transform: capitalize;
    cursor: default;
`;

export const CardImagesWrapper = styled.div`
    width: 50%;
    position: relative;
    border-top-right-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    background: linear-gradient(to top, #515151, #C5C5C5 40%);
`;

export const SwiperImg = styled.img`
    width: 100%;
`;

export const NavigationButton = styled.div`
    visibility: ${(props) => props.$notActive ? "hidden" : "visible"};
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(104, 104, 104, 0.4);
    border: 1px solid white;
    border-radius: 0.5rem;
    line-height: 2.7rem;
    text-align: center;
    color: white;

    &::after {
        display: none;
    }
`;

export const ImageCardBottom = styled.div`
    padding: 1.25rem;
`;

export const RoomType = styled.p`
    font-family: Poppins;
    font-weight: 500;
    font-size: 1.25rem;
    color: white;
    text-transform: capitalize;
`;

export const RoomDescription = styled.p`
    padding-top: 1rem;
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.875rem;
    color: #212121;
`;

export const BookMark = styled.p`
    position: absolute;
    top: 2.12132034356rem; //This is based on the next calculation: (3*sqrt(2))/2
    right: calc(-1.75rem - 2.12132034356rem);
    height: 3rem;
    width: 12rem;
    background-color: ${props => props.$background};
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: white;
    line-height: 3rem;
    text-align: center;
    text-transform: uppercase;
    transform: rotate(45deg);
    transform-origin: top;
    clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
    z-index: 5;
`;