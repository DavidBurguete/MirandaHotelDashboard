import { HiMenuAlt2 } from "react-icons/hi";
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

    return <StyledComponents.Header>
        <StyledComponents.Title>
            <StyledComponents.ToggleLateralMenu onClick={Toggler}>
                <HiMenuAlt2/>
            </StyledComponents.ToggleLateralMenu>
            <StyledComponents.H2>{innerText}</StyledComponents.H2>
        </StyledComponents.Title>
        <StyledComponents.TopMenu>
            <StyledComponents.Mail/>
            <StyledComponents.Bell/>
            <StyledComponents.Separator/>
            <StyledComponents.LogOut/>
        </StyledComponents.TopMenu>
    </StyledComponents.Header>;
}

export default Header;