import { HiMenuAlt2 } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as StyledComponents from "./HeaderStyledComponents";

function Header({Toggler}){
    const location = useLocation();
    const [ innerText, setInnerText ] = useState("Dashboard");

    useEffect(() => {
        switch(location.pathname){
            case "/":
                setInnerText("Dashboard");
                break;
            case "/rooms":
                setInnerText("Room List");
                break;
            case "/bookings":
                setInnerText("Bookings List");
                break;
            case "/guests":
                setInnerText("Guest List");
                break;
            case "/concierge":
                setInnerText("Concierge List");
                break;
        }
    }, [location]);

    return <header>
        <StyledComponents.Title>
            <StyledComponents.ToggleLateralMenu onClick={Toggler}>
                <HiMenuAlt2/>
            </StyledComponents.ToggleLateralMenu>
            <StyledComponents.H2>{innerText}</StyledComponents.H2>
        </StyledComponents.Title>
        <StyledComponents.TopMenu>
            <LuMail className="top_menu__icon"/>
            <FaRegBell className="top_menu__icon"/>
            <StyledComponents.Separator className="top_menu__icon"/>
            <IoLogOutOutline className="top_menu__icon"/>
        </StyledComponents.TopMenu>
    </header>;
}

export default Header;