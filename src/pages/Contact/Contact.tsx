import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PendingReviews from "../../components/PendingReviews/PendingReviews";
import Table from "../../components/Table/Table";
import { Filter, Filters } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./ContactStyledComponents";
import PageWrapper from "../../components/PageWrapper";
import { ContactInterface } from "../../interfaces/ContactInterface";
import { MessageStatus } from "../../enums/ContactEnum";

function Contact(){
    const [ messages, setMessages ] = useState<ContactInterface[]>([]);
    const [ filteredMessages, setFilteredMessages ] = useState<ContactInterface[]>([]);
    const [ headers, setHeaders ] = useState<string[]>([]);
    
    const [ isAll, setIsAll ] = useState(true);
    const [ isArchived, setIsArchived ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);

    useEffect(() => {
        fetch("/json/Contact.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setMessages(response.sort((a: ContactInterface, b: ContactInterface) => new Date(a.date).getDate() - new Date(b.date).getDate()));
                setFilteredMessages(response.sort((a: ContactInterface, b: ContactInterface) => new Date(a.date).getDate() - new Date(b.date).getDate()));
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

    const setFilter = (event: React.MouseEvent) => {
        setIsAll(false);
        setIsArchived(false);
        setIsPending(false);
        const HTMLInputElement = event.target as HTMLInputElement;
        switch(HTMLInputElement.innerHTML){
            case "All Messages":
                setFilteredMessages(messages);
                setIsAll(true);
                break;
            case "Archived":
                setFilteredMessages(messages.filter(message => message.status === MessageStatus.Archived));
                setIsArchived(true);
                break;
            case "Pending":
                setFilteredMessages(messages.filter(message => message.status === MessageStatus.Pending));
                setIsPending(true);
                break;
        }
    }

    useEffect(() => {
        if(isAll)
            setFilteredMessages(messages);
        else if(isArchived)
            setFilteredMessages(messages.filter(message => message.status === MessageStatus.Archived));
        else if(isPending)
            setFilteredMessages(messages.filter(message => message.status === MessageStatus.Pending));
    }, [messages]);
    
    return messages.length === 0 ? 
        <Loading/> :
        <PageWrapper>
            <PendingReviews messages={messages} setMessages={setMessages}/>
            <Filters>
                <Filter $filter={isAll as boolean} onClick={setFilter}>All Messages</Filter>
                <Filter $filter={isArchived as boolean} onClick={setFilter}>Archived</Filter>
                <Filter $filter={isPending as boolean} onClick={setFilter}>Pending</Filter>
            </Filters>
            {filteredMessages.length <= 0 ?
                <StyledComponents.NoPendingMessages>There are no new messages to display</StyledComponents.NoPendingMessages> :
                <Table headers={headers as string[]} action={undefined}>{
                    filteredMessages.map(message => {
                        return <tr key={message.message_id as number}>
                            <StyledComponents.TDDate>
                                <StyledComponents.TDHeader>{new Date(message.date as string).toString().split(" ").slice(1,4).join(" ")}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>#{message.message_id as number}</StyledComponents.TDText>
                            </StyledComponents.TDDate>
                            <StyledComponents.TD>
                                <StyledComponents.TDHeader>{message.customer as string}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>{message.email as string}</StyledComponents.TDText>
                                <StyledComponents.TDText>{message.phone_number as string}</StyledComponents.TDText>
                            </StyledComponents.TD>
                            <StyledComponents.TD>
                                <StyledComponents.TDHeader>{message.subject as string}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>{message.comment as string}</StyledComponents.TDText>
                            </StyledComponents.TD>
                            <StyledComponents.TD>
                                <StyledComponents.ArchiveButton $background={message.status === MessageStatus.Archived ? "#5AD07A" : "#E23428"} $color="white">{message.status}</StyledComponents.ArchiveButton>
                            </StyledComponents.TD>
                        </tr>;
                    })}
                </Table>
            }
        </PageWrapper>;
}

export default Contact;