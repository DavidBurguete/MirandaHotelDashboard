import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PendingReviews from "../../components/PendingReviews/PendingReviews";
import Table from "../../components/Table/Table";
import { Filter, Filters } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./ContactStyledComponents";

function Contact(){
    const [ messages, setMessages ] = useState(null);
    const [ filteredMessages, setFilteredMessages ] = useState(null);
    const [ headers, setHeaders ] = useState(null);
    
    const [ isAll, setIsAll ] = useState(true);
    const [ isArchived, setIsArchived ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);

    useEffect(() => {
        fetch("/json/Contact.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setMessages(response.sort((a, b) => new Date(a.date) - new Date(b.date)));
                setFilteredMessages(response.sort((a, b) => new Date(a.date) - new Date(b.date)));
                const headersOrdered = [
                    "Date",
                    "Customer",
                    "Comment",
                    "Status",
                ];
                setHeaders(headersOrdered);
            })
            .catch((error) => console.error(error));
    }, []);

    const setFilter = (event) => {
        setIsAll(false);
        setIsArchived(false);
        setIsPending(false);
        switch(event.target.innerHTML){
            case "All Messages":
                setFilteredMessages(messages);
                setIsAll(true);
                break;
            case "Archived":
                setFilteredMessages(messages.filter(message => message.status === "archived"));
                setIsArchived(true);
                break;
            case "Pending":
                setFilteredMessages(messages.filter(message => message.status === "pending"));
                setIsPending(true);
                break;
        }
    }

    useEffect(() => {
        if(isAll)
            setFilteredMessages(messages);
        else if(isArchived)
            setFilteredMessages(messages.filter(message => message.status === "archived"));
        else if(isPending)
            setFilteredMessages(messages.filter(message => message.status === "pending"));
    }, [messages]);
    
    return messages === null ? 
        <Loading/> :
        <main>
            <PendingReviews messages={messages} setMessages={setMessages}/>
            <Filters>
                <Filter $filter={isAll} onClick={setFilter}>All Messages</Filter>
                <Filter $filter={isArchived} onClick={setFilter}>Archived</Filter>
                <Filter $filter={isPending} onClick={setFilter}>Pending</Filter>
            </Filters>
            {filteredMessages.length <= 0 ?
                <StyledComponents.NoPendingMessages>There are no new messages to display</StyledComponents.NoPendingMessages> :
                <Table headers={headers}>{
                    filteredMessages.map(message => {
                        return <tr key={message.message_id}>
                            <StyledComponents.TDDate>
                                <StyledComponents.TDHeader>{new Date(message.date).toString().split(" ").slice(1,4).join(" ")}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>#{message.message_id}</StyledComponents.TDText>
                            </StyledComponents.TDDate>
                            <StyledComponents.TD>
                                <StyledComponents.TDHeader>{message.customer}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>{message.email}</StyledComponents.TDText>
                                <StyledComponents.TDText>{message.phone_number}</StyledComponents.TDText>
                            </StyledComponents.TD>
                            <StyledComponents.TD>
                                <StyledComponents.TDHeader>{message.subject}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>{message.comment}</StyledComponents.TDText>
                            </StyledComponents.TD>
                            <StyledComponents.TD>
                                <StyledComponents.ArchiveButton $background={message.status === "archived" ? "#5AD07A" : "#E23428"} $color="white">{message.status}</StyledComponents.ArchiveButton>
                            </StyledComponents.TD>
                        </tr>;
                    })}
                </Table>
            }
        </main>;
}

export default Contact;