import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./PendingReviewsStyledComponents";
import { Card, NavigationButton } from "../../pages/BookingCard/BookingCardStyledComponents";
import { ContactInterface, ContactState } from "../../interfaces/ContactInterface";
import { MessageStatus } from "../../enums/ContactEnum";
import Loading from "../Loading";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { archiveMessage, fetchMessages } from "../../pages/Contact/ContactSlice";
import { useDispatch } from "react-redux";

function PendingReviews(){
    const messages: ContactState = useAppSelector((state: RootState) => state.messages);
    const dispatch = useDispatch<useAppDispatch>();
    const [ firstSlide, setFirstSlide ] = useState(true);
    const [ lastSlide, setLastSlide ] = useState(false);

    const archive = (id: string) => {
        dispatch(archiveMessage(id));
    }

    return messages.loading ? 
    <Loading/> :
    <StyledComponents.PendingReviews>
        <StyledComponents.PRHeader>Latest Reviews by Customers</StyledComponents.PRHeader>
        <Swiper
            onSlideChange={(swiper) => {
                setFirstSlide(swiper.isBeginning);
                setLastSlide(swiper.isEnd);
            }}
            modules={[Navigation, Pagination]}
            slidesPerView={3}
            spaceBetween={40}
            navigation={{
                nextEl: "#swiper-button-next",
                prevEl: "#swiper-button-prev"
            }}
            style={{"borderTopRightRadius": "1.25rem"}}
        >
            {messages.messages.filter(message => message.status === MessageStatus.Pending).length <= 0 ?
                <StyledComponents.Comment>There are no new messages to display</StyledComponents.Comment> :
                messages.messages.filter(message => message.status === MessageStatus.Pending).map((message: ContactInterface) => {
                    return <SwiperSlide key={message._id as string}>
                        <StyledComponents.Message>
                            <StyledComponents.CommentHeader>{message.subject as string}</StyledComponents.CommentHeader>
                            <StyledComponents.Comment>{message.comment as string}</StyledComponents.Comment>
                            <StyledComponents.UserArchiveWrapper>
                                <StyledComponents.User>{message.customer as string}</StyledComponents.User>
                                <Button $background="#5AD07A" $color="white" onClick={() => archive(message._id as string)}>Archive</Button>
                            </StyledComponents.UserArchiveWrapper>
                        </StyledComponents.Message>
                    </SwiperSlide>;
                })
            }

            <Card>
                <NavigationButton $notActive={firstSlide as boolean} id="swiper-button-prev"><FaArrowLeft/></NavigationButton>
                <NavigationButton $notActive={lastSlide as boolean} id="swiper-button-next"><FaArrowRight/></NavigationButton>
            </Card>
        </Swiper>
    </StyledComponents.PendingReviews>
}

export default PendingReviews;