import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./BookingsStyledComponents";
import { Button, Filters, Filter } from "../../js/GlobalStyledComponents";
import Loading from "../../components/Loading";

function Bookings(){
    const [ rooms, setRooms ] = useState(null);
    const [ bookings, setBookings ] = useState(null);
    const [ filteredBookings, setFilteredBookings ] = useState(null);
    const [ headers, setHeaders ] = useState(null);

    const [ isAll, setIsAll ] = useState(true);
    const [ isIn, setIsIn ] = useState(false);
    const [ isOut, setIsOut ] = useState(false);
    const [ isProgress, setIsProgres ] = useState(false);

    const sortByOrderDate = async () => {
        let sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
        setFilteredBookings(sortedBookings);
    }

    const sortByCheckInDate = async () => {
        let sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date));
        setFilteredBookings(sortedBookings);
    }

    const sortByCheckOutDate = async () => {
        let sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.check_out_date) - new Date(b.check_out_date));
        setFilteredBookings(sortedBookings);
    }

    const setFilter = (event) => {
        setIsAll(false);
        setIsIn(false);
        setIsOut(false);
        setIsProgres(false);
        switch(event.target.innerHTML){
            case "All Bookings":
                setFilteredBookings(bookings);
                setIsAll(true);
                break;
            case "Checking In":
                setFilteredBookings(bookings.filter(booking => booking.status === "Check In"));
                setIsIn(true);
                break;
            case "Checking Out":
                setFilteredBookings(bookings.filter(booking => booking.status === "Check Out"));
                setIsOut(true);
                break;
            case "In Progress":
                setFilteredBookings(bookings.filter(booking => booking.status === "In Progress"));
                setIsProgres(true);
                break;
        }
    }

    useEffect(() => {
        fetch("/json/Rooms.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setRooms(response);
            })
            .catch((error) => console.error(error));
        fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setBookings(response);
                setFilteredBookings(response);
                const headersOrdered = [
                    {
                        head: "Guest",
                        action: null
                    },
                    {
                        head: "Order Date",
                        action: sortByOrderDate
                    },
                    {
                        head: "Check In",
                        action: sortByCheckInDate
                    },
                    {
                        head: "Check Out",
                        action: sortByCheckOutDate
                    },
                    {
                        head: "Special Request",
                        action: null
                    },
                    {
                        head: "booking Type",
                        action: null
                    },
                    {
                        head: "Status",
                        action: null
                    }
                ]
                setHeaders(headersOrdered);
            })
            .catch((error) => console.error(error));
    }, []);
    
    let bookingsOrdered = [];
    if(bookings !== null){
        bookingsOrdered = filteredBookings.map(booking => {
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
            return <StyledComponents.TR>
                <StyledComponents.TDMoreContent>
                    <p>User #{booking.client_id}</p>
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
        });
    }

    return bookings === null ?
        <Loading/> :
        <main>
            <Filters>
                <Filter onClick={setFilter} $filter={isAll}>All Bookings</Filter>
                <Filter onClick={setFilter} $filter={isIn}>Checking In</Filter>
                <Filter onClick={setFilter} $filter={isOut}>Checking Out</Filter>
                <Filter onClick={setFilter} $filter={isProgress}>In Progress</Filter>
            </Filters>
            <Table headers={headers}>{bookingsOrdered}</Table>
        </main>
    ;
}

export default Bookings;