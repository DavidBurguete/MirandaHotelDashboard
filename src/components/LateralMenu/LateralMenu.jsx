import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlKey } from "react-icons/sl";
import { LuCalendarCheck2 } from "react-icons/lu";
import { RiUser6Line } from "react-icons/ri";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import * as StyledComponents from "./LateralMenuStyledComponents";
import { Button } from "../../js/GlobalStyledComponents";

function LateralMenu({isToggled}){
    useEffect(() => {
        const menu = document.getElementById("lateral-menu");
        if(isToggled){
            menu.classList.remove("hide");
        }
        else{
            menu.classList.add("hide");
        }
    }, [isToggled]);

    return <StyledComponents.Lateral id="lateral-menu" className="hide">
        <StyledComponents.LogoContainer>
            <StyledComponents.LogoImg src="/img/hotel.svg" alt="logo" />
            <StyledComponents.LogoText>
                <StyledComponents.TravlImg src="/img/travl-light.svg"/>
                <StyledComponents.H1>Hotel Admin Dashboard</StyledComponents.H1>
            </StyledComponents.LogoText>
        </StyledComponents.LogoContainer>
        <NavLink className="panel__link" to="/">
            <StyledComponents.SelectedNavLink/>
            <LuLayoutDashboard className="panel__link__icon"/>DashBoard
        </NavLink>
        <NavLink className="panel__link" to="/rooms">
            <StyledComponents.SelectedNavLink/>
            <SlKey className="panel__link__icon panel__link__icon--room"/>Room
        </NavLink>
        <NavLink className="panel__link" to="/bookings">
            <StyledComponents.SelectedNavLink/>
            <LuCalendarCheck2 className="panel__link__icon"/>Bookings
        </NavLink>
        <NavLink className="panel__link" to="/guests">
            <StyledComponents.SelectedNavLink/>
            <RiUser6Line className="panel__link__icon"/>Guest
        </NavLink>
        <NavLink className="panel__link" to="/concierge">
            <StyledComponents.SelectedNavLink/>
            <IoExtensionPuzzleOutline className="panel__link__icon panel__link__icon--concierge"/>Concierge
        </NavLink>
        <StyledComponents.UserCard>
            <StyledComponents.OffSet>
                <StyledComponents.UserImg src="/img/david.jpeg" alt="user profile image"/>
                <StyledComponents.UserName>David Burguete</StyledComponents.UserName>
                <StyledComponents.UserMail>dburgueteg@gmail.com</StyledComponents.UserMail>
                <Button $background="#EBF1EF" $color="#135846">Contact Us</Button>
            </StyledComponents.OffSet>
        </StyledComponents.UserCard>
        <StyledComponents.About>
            <StyledComponents.AboutName>Travl Hotel Admin Dashboard</StyledComponents.AboutName>
            <StyledComponents.AboutCopyright>© 2020 All Rights Reserved</StyledComponents.AboutCopyright>
        </StyledComponents.About>
        <StyledComponents.CreatedBy>Made with ♥ by David Burguete</StyledComponents.CreatedBy>
    </StyledComponents.Lateral>
}

export default LateralMenu;