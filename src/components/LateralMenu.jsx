import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlKey } from "react-icons/sl";
import { RiUser6Line } from "react-icons/ri";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import * as StyledComponents from "../js/LateralMenuStyledComponents";

function LateralMenu(){
    return <StyledComponents.Lateral>
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
        <NavLink className="panel__link" to="/room">
            <StyledComponents.SelectedNavLink/>
            <SlKey className="panel__link__icon panel__link__icon--room"/>Room
        </NavLink>
        <NavLink className="panel__link" to="/bookings">
            <StyledComponents.SelectedNavLink/>
            <RiUser6Line className="panel__link__icon"/>Bookings
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
                <StyledComponents.UserButton>Contact Us</StyledComponents.UserButton>
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