import { enumAmenities, enumRoomType, enumRoomStatus } from "../enums/RoomEnum";

export interface Room {
    _id: string;
    room_name: string;
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

export interface RoomTypeOptions {
    value: enumRoomType,
    label: string
}

export interface AmenitiesOptions {
    value: enumAmenities,
    label: string
}

export interface RoomStatusOptions {
    value: enumRoomStatus,
    label: string
}