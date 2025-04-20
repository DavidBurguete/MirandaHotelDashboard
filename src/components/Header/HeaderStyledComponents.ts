import { LuMail } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    position: relative;
    min-height: 7.5rem;
    width: 100%;
    box-shadow: 0px 3px 10px #00000005;
    background-color: white;
`;

export const Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    position: relative;
    padding-left: 2.5rem;
    width: fit-content;
`;

export const ToggleLateralMenu = styled.button`
    border: 0;
    background-color: transparent;
    font-size: 1.75rem;
    cursor: pointer;
`;

export const H2 = styled.h2`
    padding-left: 3.125rem;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.75rem;
    color: #262626;
`;

export const TopMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    font-size: 1.75rem;
`;

export const Mail = styled(LuMail)`
    margin-block: auto;
    margin-right: 3.5rem;
`;

export const Bell = styled(FaRegBell)`
    margin-block: auto;
    margin-right: 3.5rem;
`;

export const LogOut = styled(IoLogOutOutline)`
    margin-block: auto;
    margin-right: 3.5rem;
`;

export const Separator = styled.div`
    height: 3.5rem;
    border: 1px solid #EBEBEB;
    margin-block: auto;
    margin-right: 3.5rem;
`;