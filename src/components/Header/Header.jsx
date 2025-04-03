import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as StyledComponents from "./HeaderStyledComponents";
import { logOut } from "../../pages/Login/accountSlice";

function Header({Toggler}){
    const location = useLocation();
    const [ innerText, setInnerText ] = useState("Dashboard");
    const dispatch = useDispatch();

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
            case "/contact":
                setInnerText("Guest List");
                break;
            case "/employees":
                setInnerText("Concierge List");
                break;
            case "/account":
                setInnerText("Account");
                break;
        }
    }, [location]);

    const handleLogOut = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
    }

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
            <StyledComponents.LogOut onClick={handleLogOut}/>
        </StyledComponents.TopMenu>
    </StyledComponents.Header>;
}

export default Header;