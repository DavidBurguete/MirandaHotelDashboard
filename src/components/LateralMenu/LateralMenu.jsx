import * as StyledComponents from "./LateralMenuStyledComponents";
import { Button } from "../../js/GlobalStyledComponents";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function LateralMenu({isToggled}){
    const account = useSelector(state => state.account);

    return <StyledComponents.Lateral id="lateral-menu" $toggled={isToggled}>
        <StyledComponents.LogoContainer>
            <StyledComponents.LogoImg src="/img/hotel.svg" alt="logo" />
            <StyledComponents.LogoText>
                <StyledComponents.TravlImg src="/img/travl-light.svg"/>
                <StyledComponents.H1>Hotel Admin Dashboard</StyledComponents.H1>
            </StyledComponents.LogoText>
        </StyledComponents.LogoContainer>
        <StyledComponents.StyledNavLink to="/">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Dashboard/>DashBoard
        </StyledComponents.StyledNavLink>
        <StyledComponents.StyledNavLink to="/rooms">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Key/>Room
        </StyledComponents.StyledNavLink>
        <StyledComponents.StyledNavLink to="/bookings">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Calendar/>Bookings
        </StyledComponents.StyledNavLink>
        <StyledComponents.StyledNavLink to="/contact">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Contact/>Contact
        </StyledComponents.StyledNavLink>
        <StyledComponents.StyledNavLink to="/users">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Users/>Users
        </StyledComponents.StyledNavLink>
        <StyledComponents.UserCard>
            <StyledComponents.OffSet>
                <StyledComponents.UserImg src="/img/david.jpeg" alt="user profile image"/>
                <StyledComponents.UserName>{account.name}</StyledComponents.UserName>
                <StyledComponents.UserMail>{account.email}</StyledComponents.UserMail>
                <NavLink to="/account">
                    <Button $background="#EBF1EF" $color="#135846">Your account</Button>
                </NavLink>
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