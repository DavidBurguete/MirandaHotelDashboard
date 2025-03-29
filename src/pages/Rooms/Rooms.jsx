import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./RoomsStyledComponents";
import { Button, Filter, Filters, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading";

const Rooms = () => {
    const [ rooms, setRooms ] = useState(null);
    const [ filteredRooms, setFilteredRooms ] = useState(null);
    const [ headers, setHeaders ] = useState(null);

    const [ isAll, setIsAll ] = useState(true);
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ isBooked, setIsBooked ] = useState(false);

    useEffect(() => {
        fetch("/json/Rooms.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setRooms(response);
                setFilteredRooms(response);
                const headersOrdered = [
                    "Room Name",
                    "Room Type",
                    "Amenities",
                    "Price",
                    "Status"
                ]
                setHeaders(headersOrdered);
            })
            .catch((error) => console.error(error));
    }, []);

    const setFilter = (event) => {
        setIsAll(false);
        setIsAvailable(false);
        setIsBooked(false);
        switch(event.target.innerHTML){
            case "All Rooms":
                setFilteredRooms(rooms);
                setIsAll(true);
                break;
            case "Available":
                setFilteredRooms(rooms.filter(room => room.status === "Available"));
                setIsAvailable(true);
                break;
            case "Booked":
                setFilteredRooms(rooms.filter(room => room.status === "Booked"));
                setIsBooked(true);
                break;
        }
    }

    let roomsOrdered = [];
    if(rooms !== null){
        roomsOrdered = filteredRooms.map(room => {
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
            return <StyledComponents.TR>
                    <StyledComponents.TDMoreContent>
                        <StyledComponents.TableImg src={room.photos.split("__")[0]} alt="hotel room image"/>
                        <StyledComponents.DivText>
                            <StyledComponents.ID>#{room.room_id}</StyledComponents.ID>
                            <p>{floor} Floor, Room {(room.room_id - 1) % 25 + 1}</p>
                        </StyledComponents.DivText>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{room.room_type}</StyledComponents.TD>
                    <StyledComponents.TD>{room.amenities}</StyledComponents.TD>
                    {room.offer ? 
                        <td>
                            <StyledComponents.PreviousPriceP>{room.price}<span>/Night</span></StyledComponents.PreviousPriceP>
                            <StyledComponents.PriceP>{room.discount}<span>/Night</span></StyledComponents.PriceP>
                        </td> : 
                        <StyledComponents.PriceTD>{room.price}<span>/Night</span></StyledComponents.PriceTD>
                    }
                    <td>
                        <Button $background={room.status === "Available" ? "#5AD07A" : "#E23428"} $color="white">{room.status}</Button>
                    </td>
                </StyledComponents.TR>;
        });
    }
    
    return rooms === null ?
        <Loading/> :
        <main>
            <TableActionsWrapper>
                <Filters>
                    <Filter $filter={isAll} onClick={setFilter}>All Rooms</Filter>
                    <Filter $filter={isAvailable} onClick={setFilter}>Available</Filter>
                    <Filter $filter={isBooked} onClick={setFilter}>Booked</Filter>
                </Filters>
                <NavLink to="/rooms/new">
                    <Button $background="#135846" $color="white">+ New Room</Button>
                </NavLink>
            </TableActionsWrapper>
            <Table headers={headers}>{roomsOrdered}</Table>
        </main>
    ;
}

export default Rooms;