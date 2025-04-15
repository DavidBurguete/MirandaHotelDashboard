import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import * as FormStyled from "../../js/FormStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "./../Rooms/RoomsSlice";
import { createBooking, fetchBookings } from "./../Bookings/BookingsSlice";
import PageWrapper from "../../components/PageWrapper";
import Loading from "../../components/Loading";

function today(){
    const today = new Date();
    return formatDate(today);
}

function formatDate(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
}

function NewBooking(){
    const dispatch = useDispatch();
    const { rooms } = useSelector(state => state.rooms);
    const { bookings } = useSelector(state => state.bookings);
    const [ roomsAvailable, setRoomsAvailable ] = useState([]);
    const [ clientName, setClientName ] = useState("");
    const [ roomID, setRoomID ] = useState({});
    const [ specialRequest, setSpecialRequest ] = useState("");
    const [ checkIn, setCheckIn ] = useState(today);
    const [ checkOut, setCheckOut ] = useState(today);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(rooms.loading){
            dispatch(fetchRooms());
        }
        if(bookings.loading){
            dispatch(fetchBookings());
        }
    }, []);

    useEffect(() => {
        if(!rooms.loading){
            setRoomsAvailable(rooms.filter(room => room.status === "Available").map(room => {
                let floor = "";
                switch(parseInt((room.room_id - 1) / 25) + 1){
                    case 1:
                        floor += "1st";
                        break;
                    case 2:
                        floor += "2nd";
                        break;
                    case 3:
                        floor += "3rd";
                        break;
                    default:
                        floor += (parseInt((room.room_id - 1) / 25) + 1) + "th";
                        break;
                }
                return {value: room.room_id, label: `${floor} Floor, Room ${(room.room_id - 1) % 25 + 1}`};
            }));
        }
    }, [rooms]);

    const handleClientName = (client_name) => {
        setClientName(client_name.target.value);
    };

    const handleCheckIn = (date) => {
        setCheckIn(date.target.value);
    };

    const handleCheckOut = (date) => {
        setCheckOut(date.target.value);
    };

    const handleSpecialRequest = (specialRequest) => {
        setSpecialRequest(specialRequest.target.value);
    }

    const handleRoomID = (roomID) => {
        setRoomID(roomID);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formatDateForBookingObject = (date) => {
            let dateSubdivisions = date.split("-");
            return dateSubdivisions[1] + "/" + dateSubdivisions[2] + "/" + dateSubdivisions[0];
        }
        const notFullfilledData = clientName.length === 0 || 
                                  Object.keys(roomID).length === 0 || 
                                  checkOut < checkIn
        if(!notFullfilledData){
            const newBooking = {
                "client_name": clientName,
                "booking_id": bookings.length + 1,
                "room_id": roomID.value,
                "client_id": bookings.length + 1,
                "order_date": formatDateForBookingObject(today()),
                "check_in_date": formatDateForBookingObject(checkIn),
                "check_out_date": formatDateForBookingObject(checkOut),
                "status": "In Progress",
                "special_request": specialRequest
            };
            dispatch(createBooking(newBooking));
            navigate("/bookings");
        }
    }

    return rooms.loading ? 
    <Loading/> :
    <PageWrapper>
        <FormStyled.Form onSubmit={handleSubmit}>
            <FormStyled.Label htmlFor="clientName">
                Client Name
                <FormStyled.Input type="text" name="clientName" id="clientName" placeholder="Insert the client full name" onChange={handleClientName} value={clientName}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="roomID">
                Select the room
                <Select
                    id="roomID"
                    value={roomID}
                    onChange={handleRoomID}
                    options={roomsAvailable}
                    styles={{
                        control: (baseStyles, _) => ({
                            ...baseStyles,
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "#393939"
                        })
                    }}
                />
            </FormStyled.Label>
            <FormStyled.Label htmlFor="checkIn">
                Check In
                <FormStyled.Input type="date" name="checkIn" id="checkIn" onChange={handleCheckIn} value={checkIn} min={today().toString()}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="checkOut">
                Check Out
                <FormStyled.Input type="date" name="checkOut" id="checkOut" onChange={handleCheckOut} value={checkOut} min={today().toString()}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="specialRequest">
                Does the client have any request?
                <FormStyled.Input type="text" name="specialRequest" id="specialRequest" placeholder="Insert the request" onChange={handleSpecialRequest} value={specialRequest}/>
            </FormStyled.Label>
            <FormStyled.InputSubmit type="submit" value="Create Booking"/>
        </FormStyled.Form>
    </PageWrapper>;
}

export default NewBooking;