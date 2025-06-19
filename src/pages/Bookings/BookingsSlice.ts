import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Booking, BookingState, BookingTableHeaders } from "../../interfaces/BookingInterfaces";

export const fetchBookings = createAsyncThunk<Booking[]>("bookins/fetchBookins", async() => {
    return new Promise<Booking[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/bookings`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            const bookings: Booking[] = await response.json();
            resolve(bookings);
        }
        catch(error){
            reject(error);
        }
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
    return new Promise<Booking[]>(async (resolve, reject) => {
        let booking = {} as Booking;
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/bookings/new`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_name: newBooking.client_name,
                    room: newBooking.room,
                    order_date: newBooking.order_date,
                    check_in_date: newBooking.check_in_date,
                    check_out_date: newBooking.check_out_date,
                    status: newBooking.status,
                    special_request: newBooking.special_request
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            booking = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { bookings } = state.bookings as BookingState;
        const createdBooking = [...bookings, booking];
        return createdBooking;
    });
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (updatedBooking: Booking, thunkAPI) => {
    return new Promise<Booking[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/bookings/${updatedBooking._id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    updatedBooking
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            const bookings: Booking = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { bookings } = state.bookings;
        const updatedBookings = bookings.map((booking: Booking) => {
            if(booking._id !== updatedBooking._id){
                return booking;
            }
            else{
                return updatedBooking;
            }
        });
        resolve(updatedBookings);
    });
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (_id: string, thunkAPI) => {
    return new Promise<Booking[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/bookings/${_id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            const bookings: Booking = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { bookings } = state.bookings as BookingState;
        const deletedBooking = bookings.filter((booking: Booking) => booking._id !== _id);
        resolve(deletedBooking);
    });
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