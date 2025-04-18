import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Booking, BookingState, BookingTableHeaders } from "../../interfaces/BookingInterfaces";

export const fetchBookings = createAsyncThunk<Booking[]>("bookins/fetchBookins", async() => {
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch("/json/Bookings.json");

                if(!response.ok){
                    throw new Error("An error occurred");
                }

                const bookings = await response.json();
                resolve(bookings);
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const filterBookings = createAsyncThunk("bookings/filterBookings", async(byType: string, thunkAPI) =>{
    const state = thunkAPI.getState() as RootState;
    const { bookings } = state.bookings as BookingState;
    let filteredBookings = [] as Booking[];
    switch(byType){
        case "Check In":
            filteredBookings = bookings.filter((booking: Booking) => booking.status === "Check In");
            break;
        case "Check Out":
            filteredBookings = bookings.filter((booking: Booking) => booking.status === "Check Out");
            break;
        case "In Progress":
            filteredBookings = bookings.filter((booking: Booking) => booking.status === "In Progress");
            break;
        default:
            filteredBookings = bookings;
            break;
    }
    return filteredBookings;
});

export const sortBookings = createAsyncThunk("bookings/sortBookings", async(sortBy: string, thunkAPI) =>{
    const state = thunkAPI.getState() as RootState;
    const { bookings } = state.bookings as BookingState;
    let orderedBookings = [] as Booking[];
    switch(sortBy){
        case "OrderDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.order_date).getDate() - new Date(b.order_date).getDate());
            break;
        case "CheckInDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.check_in_date).getDate() - new Date(b.check_in_date).getDate());
            break;
        case "CheckOutDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.check_out_date).getDate() - new Date(b.check_out_date).getDate());
            break;
        default:
            orderedBookings = bookings;
            break;
    }
    return orderedBookings;
});

export const createBooking = createAsyncThunk("bookings/createBooking", async (newBooking: Booking, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { bookings } = state.bookings as BookingState;
    const createdBooking = [...bookings, newBooking];
    return createdBooking;
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (updatedBooking: Booking, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { bookings } = state.bookings as BookingState;
    const updatedBookings = bookings.map((booking: Booking) => {
        if(booking.booking_id !== updatedBooking.booking_id){
            return booking;
        }
        else{
            return updatedBooking;
        }
    });
    return updatedBookings;
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (booking_id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { bookings } = state.bookings as BookingState;
    const deletedBooking = bookings.filter((booking: Booking) => booking.booking_id !== booking_id);
    return deletedBooking;
});

export const addHeaders = createAsyncThunk("bookings/addHeaders", (headers: BookingTableHeaders[]) => {
    return headers;
});

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        tableHeaders: [],
        bookings: [],
        filteredBookings: [],
        loading: true,
        error: null
    } as BookingState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookings.fulfilled, (state: BookingState, action) => {
            state.bookings = action.payload as Booking[];
            state.filteredBookings = action.payload as Booking[];
            state.loading = false;
            state.error = null;
        }).addCase(fetchBookings.rejected, (state: BookingState, action) => {
            state.loading = false;
            state.error = action.error.message as string;
        }).addCase(filterBookings.fulfilled, (state: BookingState, action) => {
            state.filteredBookings = action.payload as Booking[];
        }).addCase(sortBookings.fulfilled, (state: BookingState, action) => {
            state.filteredBookings = action.payload as Booking[];
        }).addCase(createBooking.fulfilled, (state: BookingState, action) => {
            state.bookings = action.payload as Booking[];
            state.filteredBookings = action.payload as Booking[];
        }).addCase(createBooking.rejected, (state: BookingState, action) => {
            state.error = action.error.message as string;
        }).addCase(updateBooking.fulfilled, (state: BookingState, action) => {
            state.bookings = action.payload as Booking[];
            state.filteredBookings = action.payload as Booking[];
        }).addCase(updateBooking.rejected, (state: BookingState, action) => {
            state.error = action.error.message as string;
        }).addCase(deleteBooking.fulfilled, (state: BookingState, action) => {
            state.bookings = action.payload as Booking[];
            state.filteredBookings = action.payload as Booking[];
        }).addCase(deleteBooking.rejected, (state: BookingState, action) => {
            state.error = action.error.message as string;
        }).addCase(addHeaders.fulfilled, (state: BookingState, action) => {
            state.tableHeaders = action.payload as BookingTableHeaders[];
        });
    }
});

export default bookingsSlice.reducer;