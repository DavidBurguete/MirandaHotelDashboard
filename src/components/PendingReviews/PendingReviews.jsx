import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./PendingReviewsStyledComponents";
import { Card, NavigationButton } from "../../pages/BookingCard/BookingCardStyledComponents";

function PendingReviews({messages, setMessages}){
    const [ firstSlide, setFirstSlide ] = useState(true);
    const [ lastSlide, setLastSlide ] = useState(false);

    const archive = (id) => {
        const copy = messages.map(message => {
            return message.message_id === id ? {
                ...message,
                status: "archived"
            } :
            message;
        });
        setMessages(copy);
    }

    return <StyledComponents.PendingReviews>
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
            {messages.filter(message => message.status === "pending").length <= 0 ?
                <StyledComponents.Comment>There are no new messages to display</StyledComponents.Comment> :
                messages.filter(message => message.status === "pending").map(message => {
                    return <SwiperSlide key={message.message_id}>
                        <StyledComponents.Message>
                            <StyledComponents.CommentHeader>{message.subject}</StyledComponents.CommentHeader>
                            <StyledComponents.Comment>{message.comment}</StyledComponents.Comment>
                            <StyledComponents.UserArchiveWrapper>
                                <StyledComponents.User>{message.customer}</StyledComponents.User>
                                <Button $background="#5AD07A" $color="white" onClick={() => archive(message.message_id)}>Archive</Button>
                            </StyledComponents.UserArchiveWrapper>
                        </StyledComponents.Message>
                    </SwiperSlide>;
                })
            }

            <Card>
                <NavigationButton $notActive={firstSlide} id="swiper-button-prev"><FaArrowLeft/></NavigationButton>
                <NavigationButton $notActive={lastSlide} id="swiper-button-next"><FaArrowRight/></NavigationButton>
            </Card>
        </Swiper>
    </StyledComponents.PendingReviews>
}

export default PendingReviews;