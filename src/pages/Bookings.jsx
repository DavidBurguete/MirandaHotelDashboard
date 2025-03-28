import { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { Button, Filters, Filter } from "../js/GlobalStyledComponents";
import Loading from "../components/Loading";

function Bookings(){
    const [ rooms, setRooms ] = useState(null);
    const [ bookings, setBookings ] = useState(null);
    const [ filteredBookings, setFilteredBookings ] = useState(null);
    const [ headers, setHeaders ] = useState(null);

    const sortByOrderDate = async () => {
        var sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
        setFilteredBookings(sortedBookings);
    }

    const sortByCheckInDate = async () => {
        var sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date));
        setFilteredBookings(sortedBookings);
    }

    const sortByCheckOutDate = async () => {
        var sortedBookings = await fetch("/json/Bookings.json", { mode: "cors" })
            .then((response) => {return response.json()})
            .catch(() => {null});
        sortedBookings = [...sortedBookings].sort((a, b) => new Date(a.check_out_date) - new Date(b.check_out_date));
        setFilteredBookings(sortedBookings);
    }

    const setFilter = (event) => {
        document.querySelector(".selected_filter").classList.remove("selected_filter");
        event.target.classList.add("selected_filter");
        switch(event.target.innerHTML){
            case "All Bookings":
                setFilteredBookings(bookings);
                break;
            case "Checking In":
                setFilteredBookings(bookings.filter(booking => booking.status === "Check In"));
                break;
            case "Checking Out":
                setFilteredBookings(bookings.filter(booking => booking.status === "Check Out"));
                break;
            case "In Progress":
                setFilteredBookings(bookings.filter(booking => booking.status === "In Progress"));
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
    
    if(bookings === null){
        return <Loading/>;
    }
    const bookingsOrdered = filteredBookings.map(booking => {
        var status = null;
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
        return <tr className="booking">
            <td className="booking__main_data">
                <p className="booking__main_data__booking">User #{booking.client_id}</p>
                <p className="booking__main_data__id">ID #{booking.booking_id}</p>
            </td>
            <td className="booking__extra">{booking.order_date}</td>
            <td className="booking__extra">{booking.check_in_date}</td>
            <td className="booking__extra">{booking.check_out_date}</td>
            <td className="booking__extra"><Button $background="#EBF1EF" $color="#135846">View Notes</Button></td>
            <td className="booking__extra">{rooms[booking.booking_id - 1].room_type}</td>
            <td>
                <Button $background={status.background} $color={status.color}>{booking.status}</Button>
            </td>
        </tr>;
    });

    return <main>
        <Filters>
            <Filter onClick={setFilter} className="as_button selected_filter">All Bookings</Filter>
            <Filter onClick={setFilter} className="as_button">Checking In</Filter>
            <Filter onClick={setFilter} className="as_button">Checking Out</Filter>
            <Filter onClick={setFilter} className="as_button">In Progress</Filter>
        </Filters>
        <Table headers={headers}>{bookingsOrdered}</Table>
    </main>;
}

export default Bookings;