import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as StyledComponents from "./HeaderStyledComponents";

function Header({Toggler, loggedAccountDispatch}){
    const location = useLocation();
    const [ innerText, setInnerText ] = useState("Dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        switch(location.pathname){
            case "/dashboard":
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
            case "/users":
                setInnerText("Users");
                break;
        }
    }, [location]);

    const handleLogOut = () => {
        loggedAccountDispatch({type: "login/logout"});
        localStorage.removeItem("token");
        navigate("/login");
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
            <StyledComponents.LogOut data-cy="logOut" onClick={handleLogOut}/>
        </StyledComponents.TopMenu>
    </StyledComponents.Header>;
}

export default Header;