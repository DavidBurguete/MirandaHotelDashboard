import styled from "styled-components";

export const KPIs = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const KPI = styled.div`
    display: flex;
    margin-bottom: 2.5rem;
    padding: 1.875rem;
    width: 22%;
    border-radius: 0.75rem;
    background-color: white;
    transition: 200ms;

    &:hover{
        box-shadow: 0px 16px 30px #00000014;
    }

    &:hover div:first-child{
        background-color: #E23428;
        color: white;
    }
`;

export const KPILogo = styled.div`
    padding: 1.125rem;
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    background-color: #FFEDEC;
    font-family: Poppins;
    font-size: 1.875rem;
    line-height: 1.875rem;
    text-align: center;
    color: #E23428;
    transition: 200ms;
`;

export const Bookings = styled(KPILogo)``;

export const Scheduled = styled(KPILogo)`
    font-size: 1.5rem;
`;

export const CheckIn = styled(KPILogo)``;

export const CheckOut = styled(KPILogo)`
    transform: rotate(180deg);
`;

export const KPITextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

export const KPIAmount = styled.p`
    width: 100%;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.875rem;
    color: #393939;
`;

export const KPIText = styled.p`
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.875rem;
    color: #787878;
`;