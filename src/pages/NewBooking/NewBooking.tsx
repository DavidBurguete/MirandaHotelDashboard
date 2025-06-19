import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import * as FormStyled from "../../js/FormStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, updateRoom } from "../Rooms/RoomsSlice";
import { createBooking, fetchBookings } from "../Bookings/BookingsSlice";
import PageWrapper from "../../components/PageWrapper";
import Loading from "../../components/Loading";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Booking, BookingAvailableRoom } from "../../interfaces/BookingInterfaces";
import { enumRoomStatus } from "../../enums/RoomEnum";

function today(){
    const today = new Date();
    return formatDate(today);
}

function formatDate(date: Date){
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
}

function NewBooking(){
    const dispatch = useDispatch<useAppDispatch>();
    const rooms = useAppSelector((state: RootState) => state.rooms);
    const bookings = useAppSelector((state: RootState) => state.bookings);
    const [ roomsAvailable, setRoomsAvailable ] = useState<BookingAvailableRoom[]>([]);
    const [ clientName, setClientName ] = useState<string>("");
    const [ roomID, setRoomID ] = useState<BookingAvailableRoom>();
    const [ specialRequest, setSpecialRequest ] = useState<string>("");
    const [ checkIn, setCheckIn ] = useState<string>(today);
    const [ checkOut, setCheckOut ] = useState<string>(today);
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
            setRoomsAvailable(rooms.rooms.filter(room => room.status === "Available").map(room => {
                return {value: room._id, label: room.room_name};
            }));
        }
    }, [rooms]);

    const handleClientName = (client_name: React.ChangeEvent) => {
        const HTMLInputElement = client_name.target as HTMLInputElement;
        setClientName(HTMLInputElement.value);
    };

    const handleCheckIn = (date: React.ChangeEvent) => {
        const HTMLInputElement = date.target as HTMLInputElement;
        setCheckIn(HTMLInputElement.value);
    };

    const handleCheckOut = (date: React.ChangeEvent) => {
        const HTMLInputElement = date.target as HTMLInputElement;
        setCheckOut(HTMLInputElement.value);
    };

    const handleSpecialRequest = (specialRequest: React.ChangeEvent) => {
        const HTMLInputElement = specialRequest.target as HTMLInputElement;
        setSpecialRequest(HTMLInputElement.value);
    }

    const handleRoomID = (roomID: SingleValue<BookingAvailableRoom>) => {
        setRoomID(roomID as BookingAvailableRoom);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatDateForBookingObject = (date: string) => {
            let dateSubdivisions = date.split("-");
            return dateSubdivisions[1] + "/" + dateSubdivisions[2] + "/" + dateSubdivisions[0];
        }
        const notFullfilledData = clientName.length === 0 || 
                                  Object.keys((roomID as BookingAvailableRoom)).length === 0 || 
                                  checkOut < checkIn
        if(!notFullfilledData){
            const newBooking = {
                "client_name": clientName,
                "room": rooms.rooms.find(room => room._id === (roomID as BookingAvailableRoom).value),
                "order_date": formatDateForBookingObject(today()),
                "check_in_date": formatDateForBookingObject(checkIn),
                "check_out_date": formatDateForBookingObject(checkOut),
                "status": "In Progress",
                "special_request": specialRequest
            }as Booking;
            dispatch(createBooking(newBooking));
            dispatch(updateRoom({ ...newBooking.room, status: enumRoomStatus.Booked }));
            navigate("/bookings");
        }
    }

    return rooms.loading ? 
    <Loading/> :
    <PageWrapper>
        <FormStyled.Form onSubmit={handleSubmit}>
            <FormStyled.Label htmlFor="clientName">
                Client Name
                <FormStyled.Input type="text" name="clientName" id="clientName" placeholder="Insert the client full name" onChange={handleClientName} value={clientName as string}/>
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
                <FormStyled.Input type="date" name="checkIn" id="checkIn" onChange={handleCheckIn} value={checkIn as string} min={today().toString()}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="checkOut">
                Check Out
                <FormStyled.Input type="date" name="checkOut" id="checkOut" onChange={handleCheckOut} value={checkOut as string} min={today().toString()}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="specialRequest">
                Does the client have any request?
                <FormStyled.Input type="text" name="specialRequest" id="specialRequest" placeholder="Insert the request" onChange={handleSpecialRequest} value={specialRequest as string}/>
            </FormStyled.Label>
            <FormStyled.InputSubmit type="submit" value="Create Booking"/>
        </FormStyled.Form>
    </PageWrapper>;
}

export default NewBooking;