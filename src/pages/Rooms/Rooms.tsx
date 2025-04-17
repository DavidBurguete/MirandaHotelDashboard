import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "../../components/Table/Table";
import * as StyledComponents from "./RoomsStyledComponents";
import { Button, Filter, Filters, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteRoom, fetchRooms, filterRooms } from "./RoomsSlice";
import PageWrapper from "../../components/PageWrapper";
import { useAppDispatch, RootState, useAppSelector } from "../../redux/store";
import { Room } from "../../interfaces/RoomInterfaces";
import { enumAmenities, enumRoomType, enumRoomStatus } from "../../enums/RoomEnum";

const Rooms = () => {
    const dispatch = useDispatch<useAppDispatch>();
    const navigate = useNavigate();
    const rooms = useAppSelector((state: RootState) => state.rooms);
    const [ roomsOrdered, setRoomsOrdered ] = useState<React.JSX.Element[]>([]);

    const [ isAll, setIsAll ] = useState<boolean>(true);
    const [ isAvailable, setIsAvailable ] = useState<boolean>(false);
    const [ isBooked, setIsBooked ] = useState<boolean>(false);

    useEffect(() => {
        if(rooms.loading){
            dispatch(fetchRooms());
        }
    }, []);

    const setFilter = (event: React.MouseEvent) => {
        setIsAll(false);
        setIsAvailable(false);
        setIsBooked(false);
        const target = event.target as HTMLElement;
        switch(target.innerHTML){
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

    const navigateToRoomEdit = (room_id: number) => {
        navigate(`/rooms/${room_id}`);
    }

    const handleDeleteRoom = (event: React.MouseEvent, room_id: number) => {
        event.stopPropagation();
        dispatch(deleteRoom(room_id));
    }

    useEffect(() => {
        if(!rooms.loading){
            setRoomsOrdered(rooms.filteredRooms.map((room: Room) => {
                let floor = "";
                switch((room.room_id as number - 1) / 25 + 1){
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
                        floor += ((room.room_id as number - 1) / 25 + 1) + "th";
                        break;
                }
                return <StyledComponents.TR key={room.room_id as number} onClick={() => {navigateToRoomEdit(room.room_id as number)}}>
                        <StyledComponents.TDMoreContent>
                            <StyledComponents.TableImg src={room.photos.split("__")[0] as string} alt="hotel room image"/>
                            <StyledComponents.DivText>
                                <StyledComponents.ID>#{room.room_id as number}</StyledComponents.ID>
                                <p>{floor as string} Floor, Room {(room.room_id as number - 1) % 25 + 1}</p>
                            </StyledComponents.DivText>
                        </StyledComponents.TDMoreContent>
                        <StyledComponents.TD>{room.room_type as enumRoomType}</StyledComponents.TD>
                        <StyledComponents.TD>{room.amenities as enumAmenities[]}</StyledComponents.TD>
                        {room.offer as boolean ? 
                            <td>
                                <StyledComponents.PreviousPriceP>{room.price as number}<span>/Night</span></StyledComponents.PreviousPriceP>
                                <StyledComponents.PriceP>{room.discount as number}<span>/Night</span></StyledComponents.PriceP>
                            </td> : 
                            <StyledComponents.PriceTD>{room.price as number}<span>/Night</span></StyledComponents.PriceTD>
                        }
                        <td>
                            <Button $background={room.status === enumRoomStatus.Available ? "#5AD07A" : "#E23428"} $color="white">{room.status as enumRoomStatus}</Button>
                            <StyledComponents.CrossCircled onClick={(event: React.MouseEvent) => {handleDeleteRoom(event as React.MouseEvent, room.room_id as number)}}/>
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
                    <Filter $filter={isAll as boolean} onClick={setFilter}>All Rooms</Filter>
                    <Filter $filter={isAvailable as boolean} onClick={setFilter}>Available</Filter>
                    <Filter $filter={isBooked as boolean} onClick={setFilter}>Booked</Filter>
                </Filters>
                <NavLink to="/rooms/new">
                    <Button $background="#135846" $color="white">+ New Room</Button>
                </NavLink>
            </TableActionsWrapper>
            <Table headers={rooms.tableHeaders as string[]} action={undefined}>{roomsOrdered as React.JSX.Element[]}</Table>
        </PageWrapper>
    ;
}

export default Rooms;