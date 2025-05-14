import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./PendingReviewsStyledComponents";
import { Card, NavigationButton } from "../../pages/BookingCard/BookingCardStyledComponents";
import { ContactInterface } from "../../interfaces/ContactInterface";
import { MessageStatus } from "../../enums/ContactEnum";

function PendingReviews({messages, setMessages}: {messages: ContactInterface[], setMessages: React.Dispatch<React.SetStateAction<ContactInterface[]>>}){
    const [ firstSlide, setFirstSlide ] = useState(true);
    const [ lastSlide, setLastSlide ] = useState(false);

    const archive = (id: string) => {
        fetch(`${import.meta.env.VITE_API_URL as string}/contact/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setMessages(response.sort((a: ContactInterface, b: ContactInterface) => new Date(a.date).getDate() - new Date(b.date).getDate()));
        })
        .catch((error) => console.error(error));
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
            {messages.filter(message => message.status === MessageStatus.Pending).length <= 0 ?
                <StyledComponents.Comment>There are no new messages to display</StyledComponents.Comment> :
                messages.filter(message => message.status === MessageStatus.Pending).map(message => {
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