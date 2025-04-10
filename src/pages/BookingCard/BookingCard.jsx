import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import * as StyledComponents from "./BookingCardStyledComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import 'swiper/css/bundle';
import PageWrapper from "../../components/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../Bookings/BookingsSlice";
import { fetchRooms } from "../Rooms/RoomsSlice";

const fullMonth = (month) => {
    switch(month){
        case "Jan":
            month = "January";
            break;
        case "Feb":
            month = "February";
            break;
        case "Mar":
            month = "March";
            break;
        case "Apr":
            month = "April";
            break;
        case "May":
            month = "May";
            break;
        case "Jun":
            month = "June";
            break;
        case "Jul":
            month = "July";
            break;
        case "Aug":
            month = "August";
            break;
        case "Sep":
            month = "September";
            break;
        case "Oct":
            month = "October";
            break;
        case "Nov":
            month = "November";
            break;
        case "Dec":
            month = "December";
            break;
    }
    return month;
}

const formatDay = (day) => {
    switch(day % 10){
        case 1:
            day = parseInt(day/10)+"1st";
            break;
        case 2:
            day = parseInt(day/10)+"2nd";
            break;
        case 3:
            day = parseInt(day/10)+"3rd";
            break;
        default:
            day = day + "th";
            break;
    }
    return day;
}

function BookingCard(){
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings);
    const { rooms } = useSelector(state => state.rooms);
    const [ bookedCard, setBookedCard ] = useState(null);
    const [ room, setRoom ] = useState(null);
    const [ floor, setFloor ] = useState("");
    const [ checkIn, setCheckIn ] = useState(null);
    const [ checkOut, setCheckOut ] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        if(bookings.loading){
            dispatch(fetchBookings());
            dispatch(fetchRooms());
        }
    }, []);

    useEffect(() => {
        if(!bookings.loading){
            setBookedCard(bookings.bookings[id - 1]);
        }
    }, [bookings]);

    useEffect(() => {
        if(bookedCard !== null){
            setRoom(rooms[bookedCard.room_id - 1]);
            let check_in = new Date(bookedCard.check_in_date).toString().split(" ").slice(1, 4);
            check_in[0] = fullMonth(check_in[0]);
            check_in[1] = formatDay(check_in[1]);
            setCheckIn(check_in[0] + " " + check_in[1] + ", " + check_in[2]);
            let check_out = new Date(bookedCard.check_out_date).toString().split(" ").slice(1, 4);
            check_out[0] = fullMonth(check_out[0]);
            check_out[1] = formatDay(check_out[1]);
            setCheckOut(check_out[0] + " " + check_out[1] + ", " + check_out[2]);
        }
    }, [bookedCard]);

    useEffect(() => {
        if(room !== null){
            const text =  ` Floor, Room ${(room.room_id - 1) % 25 + 1}`;
            switch(parseInt((room.room_id - 1) / 25) + 1){
                case 1:
                    setFloor("1st" + text);
                    break;
                case 2:
                    setFloor("2nd" + text);
                    break;
                case 3:
                    setFloor("3rd" + text);
                    break;
                default:
                    setFloor((parseInt((room.room_id - 1) / 25) + 1) + "th" + text);
                    break;
            }
        }
    }, [room]);

    return room === null ? 
        <Loading/> :
        <PageWrapper>
            <StyledComponents.Card>
                <StyledComponents.CardTextWrapper>
                    <StyledComponents.Name>{bookedCard.client_name}</StyledComponents.Name>
                    <StyledComponents.ID>#{bookedCard.booking_id}</StyledComponents.ID>
                    <StyledComponents.SameLineDataWrapper>
                        <div>
                            <StyledComponents.TextHeader>Check In</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{checkIn}</StyledComponents.TextMain>
                        </div>
                        <div>
                            <StyledComponents.TextHeader>Check Out</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{checkOut}</StyledComponents.TextMain>
                        </div>
                    </StyledComponents.SameLineDataWrapper>
                    <StyledComponents.HR/>
                    <StyledComponents.SameLineDataWrapper>
                        <div>
                            <StyledComponents.TextHeader>Room Info</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{floor}</StyledComponents.TextMain>
                        </div>
                        <div>
                            <StyledComponents.TextHeader>Price</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>${room.price} <span>/Night</span></StyledComponents.TextMain>
                        </div>
                    </StyledComponents.SameLineDataWrapper>
                    <StyledComponents.Description>{bookedCard.special_request}</StyledComponents.Description>
                    <div>
                        <StyledComponents.TextHeader>Amenities</StyledComponents.TextHeader>
                        {room.amenities.split(",").map((amenity) => {
                            return <StyledComponents.AmenityCard key={amenity} $background="#EBF1EF" $color="#135846">{amenity}</StyledComponents.AmenityCard>;
                        })}
                    </div>
                </StyledComponents.CardTextWrapper>
                <StyledComponents.CardImagesWrapper>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        navigation={{
                            nextEl: "#swiper-button-next",
                            prevEl: "#swiper-button-prev"
                        }}
                        loop
                        style={{"borderTopRightRadius": "1.25rem"}}
                    >
                        {room.photos.split("__").map(photo => {
                            return <SwiperSlide key={photo}>
                                <StyledComponents.SwiperImg src={photo} alt="an image of a room"/>
                            </SwiperSlide>;
                        })}
                        <StyledComponents.Card>
                            <StyledComponents.NavigationButton id="swiper-button-prev"><FaArrowLeft/></StyledComponents.NavigationButton>
                            <StyledComponents.NavigationButton id="swiper-button-next"><FaArrowRight/></StyledComponents.NavigationButton>
                        </StyledComponents.Card>
                    </Swiper>
                    <StyledComponents.ImageCardBottom>
                        <StyledComponents.RoomType>{room.room_type}</StyledComponents.RoomType>
                        <StyledComponents.RoomDescription>{room.description}</StyledComponents.RoomDescription>
                    </StyledComponents.ImageCardBottom>
                    <StyledComponents.BookMark $background={room.status === "Available" ? "#5AD07A" : "#E23428"}>{room.status}</StyledComponents.BookMark>
                </StyledComponents.CardImagesWrapper>
            </StyledComponents.Card>
        </PageWrapper>;
}

export default BookingCard;