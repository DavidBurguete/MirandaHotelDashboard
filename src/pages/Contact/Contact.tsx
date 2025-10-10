import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PendingReviews from "../../components/PendingReviews/PendingReviews";
import Table from "../../components/Table/Table";
import { Filter, Filters } from "../../js/GlobalStyledComponents";
import * as StyledComponents from "./ContactStyledComponents";
import PageWrapper from "../../components/PageWrapper";
import { ContactInterface, ContactState } from "../../interfaces/ContactInterface";
import { MessageStatus } from "../../enums/ContactEnum";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { archiveMessage, fetchMessages } from "./ContactSlice";

function Contact(){
    const messages: ContactState = useAppSelector((state: RootState) => state.messages);
    const dispatch = useDispatch<useAppDispatch>();
    const [ filteredMessages, setFilteredMessages ] = useState<ContactInterface[]>([]);
    const [ headers, setHeaders ] = useState<string[]>([]);
    
    const [ isAll, setIsAll ] = useState(true);
    const [ isArchived, setIsArchived ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);

    useEffect(() => {
        dispatch(fetchMessages());
    }, []);

    const archive = (id: string) => {
        dispatch(archiveMessage(id));
    }

    const setFilter = (event: React.MouseEvent) => {
        setIsAll(false);
        setIsArchived(false);
        setIsPending(false);
        const HTMLInputElement = event.target as HTMLInputElement;
        switch(HTMLInputElement.innerHTML){
            case "All Messages":
                setFilteredMessages(messages.messages);
                setIsAll(true);
                break;
            case "Archived":
                setFilteredMessages(messages.messages.filter(message => message.status === MessageStatus.Archived));
                setIsArchived(true);
                break;
            case "Pending":
                setFilteredMessages(messages.messages.filter(message => message.status === MessageStatus.Pending));
                setIsPending(true);
                break;
        }
    }

    useEffect(() => {
        if(isAll)
            setFilteredMessages(messages.messages);
        else if(isArchived)
            setFilteredMessages(messages.messages.filter(message => message.status === MessageStatus.Archived));
        else if(isPending)
            setFilteredMessages(messages.messages.filter(message => message.status === MessageStatus.Pending));
    }, [messages]);
    
    return messages.loading ? 
        <Loading/> :
        <PageWrapper>
            <PendingReviews/>
            <Filters>
                <Filter $filter={isAll as boolean} onClick={setFilter}>All Messages</Filter>
                <Filter $filter={isArchived as boolean} onClick={setFilter}>Archived</Filter>
                <Filter $filter={isPending as boolean} onClick={setFilter}>Pending</Filter>
            </Filters>
            {filteredMessages.length <= 0 ?
                <StyledComponents.NoPendingMessages>There are no new messages to display</StyledComponents.NoPendingMessages> :
                <Table headers={headers as string[]} action={undefined}>{
                    filteredMessages.map(message => {
                        return <tr key={message._id as string}>
                            <StyledComponents.TDDate>
                                <StyledComponents.TDHeader>{new Date(message.date as string).toString().split(" ").slice(1,4).join(" ")}</StyledComponents.TDHeader>
                                <StyledComponents.TDText>#{message._id as string}</StyledComponents.TDText>
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
                                <StyledComponents.ArchiveButton $background={message.status === MessageStatus.Archived ? "#5AD07A" : "#E23428"} 
                                    $color="white"
                                    onClick={() => message.status === MessageStatus.Pending ? archive(message._id as string) : ""}
                                >
                                    {message.status}
                                </StyledComponents.ArchiveButton>
                            </StyledComponents.TD>
                        </tr>;
                    })}
                </Table>
            }
        </PageWrapper>;
}

export default Contact;