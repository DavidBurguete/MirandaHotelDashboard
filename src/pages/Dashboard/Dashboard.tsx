import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PendingReviews from "../../components/PendingReviews/PendingReviews";
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import * as StyledComponents from "./DashboardStyledComponents";
import PageWrapper from "../../components/PageWrapper";
import { ContactInterface } from "../../interfaces/ContactInterface";

function Dashboard(){
    const [ messages, setMessages ] = useState<ContactInterface[]>([]);

    useEffect(() => {
        fetch("/json/Contact.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setMessages(response);
            })
            .catch((error) => console.error(error));
    }, []);

    return messages.length === 0 ? 
        <Loading/> :
        <PageWrapper>
            <StyledComponents.KPIs>
                <StyledComponents.KPI>
                    <StyledComponents.Bookings>
                        <IoBedOutline/>
                    </StyledComponents.Bookings>
                    <StyledComponents.KPITextWrapper>
                        <StyledComponents.KPIAmount>8,461</StyledComponents.KPIAmount>
                        <StyledComponents.KPIText>New Booking</StyledComponents.KPIText>
                    </StyledComponents.KPITextWrapper>
                </StyledComponents.KPI>
                <StyledComponents.KPI>
                    <StyledComponents.Scheduled>
                        <LuCalendarCheck2/>
                    </StyledComponents.Scheduled>
                    <StyledComponents.KPITextWrapper>
                        <StyledComponents.KPIAmount>963</StyledComponents.KPIAmount>
                        <StyledComponents.KPIText>Scheduled Room</StyledComponents.KPIText>
                    </StyledComponents.KPITextWrapper>
                </StyledComponents.KPI>
                <StyledComponents.KPI>
                    <StyledComponents.CheckIn>
                        <IoLogInOutline/>
                    </StyledComponents.CheckIn>
                    <StyledComponents.KPITextWrapper>
                        <StyledComponents.KPIAmount>753</StyledComponents.KPIAmount>
                        <StyledComponents.KPIText>Check In</StyledComponents.KPIText>
                    </StyledComponents.KPITextWrapper>
                </StyledComponents.KPI>
                <StyledComponents.KPI>
                    <StyledComponents.CheckOut>
                        <IoLogOutOutline/>
                    </StyledComponents.CheckOut>
                    <StyledComponents.KPITextWrapper>
                        <StyledComponents.KPIAmount>516</StyledComponents.KPIAmount>
                        <StyledComponents.KPIText>Check Out</StyledComponents.KPIText>
                    </StyledComponents.KPITextWrapper>
                </StyledComponents.KPI>
            </StyledComponents.KPIs>
            <PendingReviews messages={messages} setMessages={setMessages}/>
        </PageWrapper>;
}

export default Dashboard;