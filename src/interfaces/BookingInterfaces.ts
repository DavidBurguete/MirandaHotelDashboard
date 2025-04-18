import { BookingStatus } from "../enums/BookingEnum";

export interface Booking {
    client_name: string,
    booking_id: number,
    room_id: number,
    client_id: number,
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
    value: number,
    label: string
}