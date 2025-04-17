import { enumAmenities, enumRoomType, enumRoomStatus } from "../enums/RoomEnum";

export interface Room {
    room_id: number;
    room_type: enumRoomType;
    description: string;
    photos: string;
    offer: boolean;
    price: number;
    discount: number,
    cancellation_policy: string;
    amenities: enumAmenities[],
    status: enumRoomStatus
}

export interface RoomState {
    tableHeaders: string[];
    rooms: Room[],
    filteredRooms: Room[],
    loading: boolean,
    error: string | null;
}