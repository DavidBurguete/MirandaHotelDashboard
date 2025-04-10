import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./RoomsStyledComponents";
import { Button, Filter, Filters, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteRoom, fetchRooms, filterRooms } from "./RoomsSlice";
import PageWrapper from "../../components/PageWrapper";

const Rooms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector(state => state.rooms);
    const [ roomsOrdered, setRoomsOrdered ] = useState([]);

    const [ isAll, setIsAll ] = useState(true);
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ isBooked, setIsBooked ] = useState(false);

    useEffect(() => {
        if(rooms.loading){
            dispatch(fetchRooms());
        }
    }, []);

    const setFilter = (event) => {
        setIsAll(false);
        setIsAvailable(false);
        setIsBooked(false);
        switch(event.target.innerHTML){
            case "All Rooms":
                dispatch(filterRooms("All"));
                setIsAll(true);
                break;
            case "Available":
                dispatch(filterRooms("Available"));
                setIsAvailable(true);
                break;
            case "Booked":
                dispatch(filterRooms("Booked"));
                setIsBooked(true);
                break;
        }
    }

    const navigateToRoomEdit = (room_id) => {
        navigate(`/rooms/${room_id}`);
    }

    const handleDeleteRoom = (event, room_id) => {
        event.stopPropagation();
        dispatch(deleteRoom(room_id));
    }

    useEffect(() => {
        if(!rooms.loading){
            setRoomsOrdered(rooms.filteredRooms.map(room => {
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
                return <StyledComponents.TR key={room.room_id} onClick={() => {navigateToRoomEdit(room.room_id)}}>
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
                            <StyledComponents.CrossCircled onClick={(event) => {handleDeleteRoom(event, room.room_id)}}/>
                        </td>
                    </StyledComponents.TR>;
                })
            );
        }
    }, [rooms]);
    
    return rooms.loading ?
        <Loading/> :
        <PageWrapper>
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
            <Table headers={rooms.tableHeaders}>{roomsOrdered}</Table>
        </PageWrapper>
    ;
}

export default Rooms;