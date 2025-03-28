import { useEffect } from "react";
import * as StyledComponents from "./LateralMenuStyledComponents";
import { Button } from "../../js/GlobalStyledComponents";

function LateralMenu({isToggled}){
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
        <StyledComponents.StyledNavLink to="/guests">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.User/>Guest
        </StyledComponents.StyledNavLink>
        <StyledComponents.StyledNavLink to="/concierge">
            <StyledComponents.SelectedNavLink/>
            <StyledComponents.Concierge/>Concierge
        </StyledComponents.StyledNavLink>
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