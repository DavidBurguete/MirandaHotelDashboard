import { HiMenuAlt2 } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    position: relative;
    padding-left: 2.5rem;
    width: fit-content;
    height: 100%;
`;

const ToggleLateralMenu = styled.button`
    border: 0;
    background-color: transparent;
    font-size: 1.75rem;
`;

const H2 = styled.h2`
    padding-left: 3.125rem;
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.75rem;
    color: #262626;
`;

const TopMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    font-size: 1.75rem;
`;

const Separator = styled.div`
    height: 3.5rem;
    border: 1px solid #EBEBEB;
`;

function Header({Toggler}){
    const location = useLocation();
    const [ innerText, setInnerText ] = useState("Dashboard");

    useEffect(() => {
        switch(location.pathname){
            case "/":
                setInnerText("Dashboard");
                break;
            case "/room":
                setInnerText("Room List");
                break;
            case "/guest":
                setInnerText("Guest List");
                break;
            case "/concierge":
                setInnerText("Concierge List");
                break;
        }
    }, [location]);

    return <header>
        <Title>
            <ToggleLateralMenu onClick={Toggler}>
                <HiMenuAlt2/>
            </ToggleLateralMenu>
            <H2>{innerText}</H2>
        </Title>
        <TopMenu>
            <LuMail className="top_menu__icon"/>
            <FaRegBell className="top_menu__icon"/>
            <Separator className="top_menu__icon"/>
            <IoLogOutOutline className="top_menu__icon"/>
        </TopMenu>
    </header>;
}

export default Header;