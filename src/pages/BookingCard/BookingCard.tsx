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
import { useDispatch } from "react-redux";
import { fetchBookings } from "../Bookings/BookingsSlice";
import { fetchRooms } from "../Rooms/RoomsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Booking } from "../../interfaces/BookingInterfaces";
import { Room } from "../../interfaces/RoomInterfaces";
import { enumAmenities, enumRoomStatus, enumRoomType } from "../../enums/RoomEnum";

const fullMonth = (month: string) => {
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

const formatDay = (day: number) => {
    let dayAsString = "";
    switch(day % 10){
        case 1:
            dayAsString = day/10+"1st";
            break;
        case 2:
            dayAsString = day/10+"2nd";
            break;
        case 3:
            dayAsString = day/10+"3rd";
            break;
        default:
            dayAsString = day + "th";
            break;
    }
    return dayAsString;
}

function BookingCard(){
    const dispatch = useDispatch<useAppDispatch>();
    const bookings = useAppSelector((state: RootState) => state.bookings);
    const [ bookedCard, setBookedCard ] = useState<Booking>();
    const [ room, setRoom ] = useState<Room>();
    const [ checkIn, setCheckIn ] = useState<string>("");
    const [ checkOut, setCheckOut ] = useState<string>("");
    const { id } = useParams();
    
    useEffect(() => {
        if(bookings.loading){
            dispatch(fetchBookings());
            dispatch(fetchRooms());
        }
    }, []);

    useEffect(() => {
        if(!bookings.loading){
            setBookedCard(bookings.bookings.find(booking => booking._id === (id as string)));
        }
    }, [bookings]);

    useEffect(() => {
        if(bookedCard !== undefined){
            setRoom(bookedCard.room);
            let check_in = new Date(bookedCard.check_in_date).toString().split(" ").slice(1, 4);
            check_in[0] = fullMonth(check_in[0] as string);
            check_in[1] = formatDay(parseInt(check_in[1]) as number);
            setCheckIn(check_in[0] + " " + check_in[1] + ", " + check_in[2]);
            let check_out = new Date(bookedCard.check_out_date).toString().split(" ").slice(1, 4);
            check_out[0] = fullMonth(check_out[0] as string);
            check_out[1] = formatDay(parseInt(check_out[1]) as number);
            setCheckOut(check_out[0] + " " + check_out[1] + ", " + check_out[2]);
        }
    }, [bookedCard]);

    return room === undefined || bookedCard === undefined ? 
        <Loading/> :
        <PageWrapper>
            <StyledComponents.Card>
                <StyledComponents.CardTextWrapper>
                    <StyledComponents.Name>{bookedCard.client_name as string}</StyledComponents.Name>
                    <StyledComponents.ID>#{bookedCard._id as string}</StyledComponents.ID>
                    <StyledComponents.SameLineDataWrapper>
                        <div>
                            <StyledComponents.TextHeader>Check In</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{checkIn as string}</StyledComponents.TextMain>
                        </div>
                        <div>
                            <StyledComponents.TextHeader>Check Out</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{checkOut as string}</StyledComponents.TextMain>
                        </div>
                    </StyledComponents.SameLineDataWrapper>
                    <StyledComponents.HR/>
                    <StyledComponents.SameLineDataWrapper>
                        <div>
                            <StyledComponents.TextHeader>Room Info</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>{room.room_name as string}</StyledComponents.TextMain>
                        </div>
                        <div>
                            <StyledComponents.TextHeader>Price</StyledComponents.TextHeader>
                            <StyledComponents.TextMain>${room.price as number} <span>/Night</span></StyledComponents.TextMain>
                        </div>
                    </StyledComponents.SameLineDataWrapper>
                    <StyledComponents.Description>{bookedCard.special_request as string !== "" ? bookedCard.special_request as string : <i>The client does not have any special request</i>}</StyledComponents.Description>
                    <div>
                        <StyledComponents.TextHeader>Amenities</StyledComponents.TextHeader>
                        {room.amenities.map((amenity: enumAmenities) => {
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
                        {room.photos.split("__").map((photo: string) => {
                            return <SwiperSlide key={photo}>
                                <StyledComponents.SwiperImg src={photo} alt="an image of a room"/>
                            </SwiperSlide>;
                        })}
                        <StyledComponents.Card>
                            <StyledComponents.NavigationButton $notActive={false} id="swiper-button-prev"><FaArrowLeft/></StyledComponents.NavigationButton>
                            <StyledComponents.NavigationButton $notActive={false} id="swiper-button-next"><FaArrowRight/></StyledComponents.NavigationButton>
                        </StyledComponents.Card>
                    </Swiper>
                    <StyledComponents.ImageCardBottom>
                        <StyledComponents.RoomType>{room.room_type as enumRoomType}</StyledComponents.RoomType>
                        <StyledComponents.RoomDescription>{room.description as string}</StyledComponents.RoomDescription>
                    </StyledComponents.ImageCardBottom>
                    <StyledComponents.BookMark $background={room.status === enumRoomStatus.Available ? "#5AD07A" : "#E23428"}>{room.status}</StyledComponents.BookMark>
                </StyledComponents.CardImagesWrapper>
            </StyledComponents.Card>
        </PageWrapper>;
}

export default BookingCard;