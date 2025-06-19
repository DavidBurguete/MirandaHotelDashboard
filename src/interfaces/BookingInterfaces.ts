import { BookingStatus } from "../enums/BookingEnum";
import { Room } from "./RoomInterfaces";

export interface Booking {
    _id: string,
    client_name: string,
    room: Room,
    order_date: string,
    check_in_date: string,
    check_out_date: string,
    status: BookingStatus,
    special_request: string
}

export interface BookingTableHeaders {
    head: string,
    action: string | null
}

export interface BookingState {
    tableHeaders: BookingTableHeaders[],
    bookings: Booking[],
    filteredBookings: Booking[],
    loading: boolean,
    error: string | null
}

export interface BookingButtonStatus {
    background: string;
    color: string;
}

export interface BookingAvailableRoom {
    value: string,
    label: string
}