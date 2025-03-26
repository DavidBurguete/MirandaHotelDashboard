import styled from "styled-components";

export const Lateral = styled.nav`
    display: flex;
    flex-direction: column;
    position: relative;
    right: 0;
    max-width: 21.5rem;
    width: 20%;
    min-height: 100vh;
    box-shadow: 13px 3px 40px #00000005;
    background-color:  white;
    transition: 200ms ease-in-out;
    z-index: 2;
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-inline: 3.5rem 1rem;
    padding-block: 2rem;
`;

export const LogoImg = styled.img`
    width: 3rem;
`;

export const LogoText = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    margin-left: 2rem;
`;

export const TravlImg = styled.img`
    width: 4.5rem;
`;

export const H1 = styled.h1`
    font-family: "Poppins";
    font-weight: 400;
    font-size: 0.75rem;
    color: #5D5449;
`;

export const SelectedNavLink = styled.div`
    display: none;
    position: absolute;
    height: 80%;
    width: 1rem;
    bottom: 10%;
    left: -0.5rem;
    border-radius: 0.375rem;
    background-color: #E23428;
`;

export const UserCard = styled.div`
    margin: 0 auto;
    margin-top: 5rem;
    padding-inline: 2.375rem;
    border-radius: 1.125rem;
    box-shadow: 0px 20px 30px #00000014;
    text-align: center;
`;

export const OffSet = styled.div`
    position: relative;
    bottom: 2rem;
`;

export const UserImg = styled.img`
    width: 4.375rem;
    border-radius: 0.5rem;
`;

export const UserName = styled.p`
    padding-top: 1rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 1rem;
    color: #393939;
`;

export const UserMail = styled.p`
    padding-top: 0.5rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 0.75rem;
    color: #B2B2B2;
`;

export const About = styled.div`
    margin-inline: 3.5rem 1rem;
    margin-block: 4rem;
`;

export const AboutName = styled.p`
    font-family: Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: #212121;
`;

export const AboutCopyright = styled.p`
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.875rem;
    color: #799283;
`;

export const CreatedBy = styled.p`
    margin: 0 0 3.5rem 3.5rem;
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.875rem;
    color: #799283;
`;