import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./BookingsStyledComponents";
import { Button, Filters, Filter } from "../../js/GlobalStyledComponents";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { addHeaders, fetchBookings, filterBookings, sortBookings } from "./BookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../Rooms/RoomsSlice";
import PageWrapper from "../../components/PageWrapper";

function Bookings(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rooms } = useSelector(state => state.rooms);
    const bookings = useSelector(state => state.bookings);
    const [ bookingsOrdered, setBookingsOrdered ] = useState([]);

    const [ isAll, setIsAll ] = useState(true);
    const [ isIn, setIsIn ] = useState(false);
    const [ isOut, setIsOut ] = useState(false);
    const [ isProgress, setIsProgres ] = useState(false);
    
    useEffect(() => {
        if(bookings.loading){
            dispatch(fetchRooms());
            dispatch(fetchBookings());
            const headersOrdered = [
                {
                    head: "Guest",
                    action: null
                },
                {
                    head: "Order Date",
                    action: "OrderDate"
                },
                {
                    head: "Check In",
                    action: "CheckInDate"
                },
                {
                    head: "Check Out",
                    action: "CheckOutDate"
                },
                {
                    head: "Special Request",
                    action: null
                },
                {
                    head: "Room Type",
                    action: null
                },
                {
                    head: "Status",
                    action: null
                }
            ]
            dispatch(addHeaders(headersOrdered));
        }
    }, []);

    const navigateToBookingCard = (booking_id) => {
        navigate(`/bookings/${booking_id}`);
    }

    useEffect(() => {
        if(bookings.bookings.length > 0 && rooms.length > 0){
            setBookingsOrdered(bookings.filteredBookings.map(booking => {
                let status = null;
                switch(booking.status){
                    case "Check In":
                        status = {
                            background: "#9BE3AF",
                            color: "#0AA032"
                        }
                        break;
                    case "Check Out":
                        status = {
                            background: "#F3ADA9",
                            color: "#A81F16"
                        }
                        break;
                    case "In Progress":
                        status = {
                            background: "#F1FFB1",
                            color: "#AFA914"
                        }
                        break;
                }
                return <StyledComponents.TR key={booking.booking_id} onClick={() => navigateToBookingCard(booking.booking_id)}>
                    <StyledComponents.TDMoreContent>
                        <p>{booking.client_name}</p>
                        <StyledComponents.ID>ID #{booking.booking_id}</StyledComponents.ID>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{booking.order_date}</StyledComponents.TD>
                    <StyledComponents.TD>{booking.check_in_date}</StyledComponents.TD>
                    <StyledComponents.TD>{booking.check_out_date}</StyledComponents.TD>
                    <StyledComponents.TD><Button $background="#EBF1EF" $color="#135846">View Notes</Button></StyledComponents.TD>
                    <StyledComponents.TD>{rooms[booking.booking_id - 1].room_type}</StyledComponents.TD>
                    <td>
                        <Button $background={status.background} $color={status.color}>{booking.status}</Button>
                    </td>
                </StyledComponents.TR>;
            }));
        }
    }, [bookings]);

    const setFilter = (event) => {
        setIsAll(false);
        setIsIn(false);
        setIsOut(false);
        setIsProgres(false);
        switch(event.target.innerHTML){
            case "All Bookings":
                dispatch(filterBookings("All Bookings"));
                setIsAll(true);
                break;
            case "Checking In":
                dispatch(filterBookings("Check In"));
                setIsIn(true);
                break;
            case "Checking Out":
                dispatch(filterBookings("Check Out"));
                setIsOut(true);
                break;
            case "In Progress":
                dispatch(filterBookings("In Progress"));
                setIsProgres(true);
                break;
        }
    }

    return bookings.loading ?
        <Loading/> :
        <PageWrapper>
            <Filters>
                <Filter onClick={setFilter} $filter={isAll}>All Bookings</Filter>
                <Filter onClick={setFilter} $filter={isIn}>Checking In</Filter>
                <Filter onClick={setFilter} $filter={isOut}>Checking Out</Filter>
                <Filter onClick={setFilter} $filter={isProgress}>In Progress</Filter>
            </Filters>
            <Table headers={bookings.tableHeaders} action={sortBookings}>{bookingsOrdered}</Table>
        </PageWrapper>
    ;
}

export default Bookings;