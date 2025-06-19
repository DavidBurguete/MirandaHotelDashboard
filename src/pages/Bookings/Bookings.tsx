import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./BookingsStyledComponents";
import { Button, Filters, Filter, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import Loading from "../../components/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { addHeaders, deleteBooking, fetchBookings, filterBookings, sortBookings } from "./BookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, updateRoom } from "../Rooms/RoomsSlice";
import PageWrapper from "../../components/PageWrapper";
import { RootState, useAppDispatch } from "../../redux/store";
import { Booking, BookingButtonStatus, BookingState, BookingTableHeaders } from "../../interfaces/BookingInterfaces";
import { BookingStatus } from "../../enums/BookingEnum";
import { enumRoomStatus, enumRoomType } from "../../enums/RoomEnum";
import { Room } from "../../interfaces/RoomInterfaces";

function Bookings(){
    const dispatch = useDispatch<useAppDispatch>();
    const navigate = useNavigate();
    const { rooms } = useSelector((state: RootState) => state.rooms);
    const bookings = useSelector((state: RootState) => state.bookings);
    const [ bookingsOrdered, setBookingsOrdered ] = useState<React.JSX.Element[]>([]);

    const [ isAll, setIsAll ] = useState<boolean>(true);
    const [ isIn, setIsIn ] = useState<boolean>(false);
    const [ isOut, setIsOut ] = useState<boolean>(false);
    const [ isProgress, setIsProgres ] = useState<boolean>(false);
    
    useEffect(() => {
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
    }, []);

    const navigateToBookingCard = (_id: string) => {
        navigate(`/bookings/${_id}`);
    }

    const handleDeleteBooking = (event: React.MouseEvent, _id: string, room_id: string) => {
        event.stopPropagation();
        dispatch(deleteBooking(_id));
        const roomAvailableAgain = rooms.find(room => room._id === room_id) as Room;
        dispatch(updateRoom({ ...roomAvailableAgain, status: enumRoomStatus.Available }));
    }

    useEffect(() => {
        if(bookings.bookings.length > 0 && rooms.length > 0){
            setBookingsOrdered(bookings.filteredBookings.map((booking: Booking) => {
                let status = {} as BookingButtonStatus;
                switch(booking.status as BookingStatus){
                    case BookingStatus.CheckIn:
                        status = {
                            background: "#9BE3AF",
                            color: "#0AA032"
                        }
                        break;
                    case BookingStatus.CheckOut:
                        status = {
                            background: "#F3ADA9",
                            color: "#A81F16"
                        }
                        break;
                    case BookingStatus.InProgress:
                        status = {
                            background: "#F1FFB1",
                            color: "#AFA914"
                        }
                        break;
                }
                return <StyledComponents.TR key={booking._id as string} onClick={() => navigateToBookingCard(booking._id as string)}>
                    <StyledComponents.TDMoreContent>
                        <p>{booking.client_name as string}</p>
                        <StyledComponents.ID>ID #{booking._id as string}</StyledComponents.ID>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{booking.order_date as string}</StyledComponents.TD>
                    <StyledComponents.TD>{booking.check_in_date as string}</StyledComponents.TD>
                    <StyledComponents.TD>{booking.check_out_date as string}</StyledComponents.TD>
                    <StyledComponents.TD><Button $background="#EBF1EF" $color="#135846">View Notes</Button></StyledComponents.TD>
                    <StyledComponents.TD>{(booking.room as Room).room_type as enumRoomType}</StyledComponents.TD>
                    <td>
                        <Button $background={status.background} $color={status.color}>{booking.status}</Button>
                        <StyledComponents.CrossCircled onClick={(event) => {handleDeleteBooking(event, booking._id, booking.room._id)}}/>
                    </td>
                </StyledComponents.TR>;
            }));
        }
    }, [bookings]);

    const setFilter = (event: React.MouseEvent) => {
        setIsAll(false);
        setIsIn(false);
        setIsOut(false);
        setIsProgres(false);
        const innerHTML = event.target as HTMLElement;
        switch(innerHTML.innerHTML){
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
            <TableActionsWrapper>
                <Filters>
                    <Filter onClick={setFilter} $filter={isAll as boolean}>All Bookings</Filter>
                    <Filter onClick={setFilter} $filter={isIn as boolean}>Checking In</Filter>
                    <Filter onClick={setFilter} $filter={isOut as boolean}>Checking Out</Filter>
                    <Filter onClick={setFilter} $filter={isProgress as boolean}>In Progress</Filter>
                </Filters>
                <NavLink to="/bookings/new">
                    <Button $background="#135846" $color="white">+ New Booking</Button>
                </NavLink>
            </TableActionsWrapper>  
            <Table headers={bookings.tableHeaders as BookingTableHeaders[]} action={sortBookings}>{bookingsOrdered as React.JSX.Element[]}</Table>
        </PageWrapper>
    ;
}

export default Bookings;