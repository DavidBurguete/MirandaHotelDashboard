import { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { Button } from "../js/GlobalStyledComponents";

const Rooms = () => {
    const [ rooms, setRooms ] = useState(null);
    const [ headers, setHeaders ] = useState(null);

    useEffect(() => {
        fetch("/json/Rooms.json", { mode: "cors" })
            .then((response) => response.json())
            .then((response) => {
                setRooms(response);
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

    if(rooms === null){
        return <p>loading...</p>
    }
    const roomsOrdered = rooms.map(room => {
        var floor = "";
        switch(parseInt((room.room_id - 1) / 25)){
            case 0:
                floor += "Ground";
                break;
            case 1:
                floor += "First";
                break;
            case 2:
                floor += "Second";
                break;
            case 3:
                floor += "Third";
                break;
        }
        return <>
            <tr className="room">
                <td className="room__main_data">
                    <img src={room.photos.split("__")[0]} alt="hotel room image" className="room__main_data__img"/>
                    <div className="room__main_data__text">
                        <p className="room__main_data__text__id">#{room.room_id}</p>
                        <p className="room__main_data__text__room">{floor}, Room {(room.room_id - 1) % 25 + 1}</p>
                    </div>
                </td>
                <td className="room__extra">{room.room_type}</td>
                <td className="room__extra">{room.amenities}</td>
                {room.offer ? 
                    <td>
                        <p className="room__price room__price--previous">{room.price}<span>/Night</span></p>
                        <p className="room__price">{room.discount}<span>/Night</span></p>
                    </td> : 
                    <td className="room__price">{room.price}<span>/Night</span></td>
                }
                <td>
                    <Button $background={room.status === "Available" ? "#5AD07A" : "#E23428"} $color="white">{room.status}</Button>
                </td>
            </tr>
        </>;
    });
    return <main>
        <Button $background="#135846" $color="white">+ New Room</Button>
        <Table headers={headers}>{roomsOrdered}</Table>
    </main>;
}

export default Rooms;