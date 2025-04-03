import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookings = createAsyncThunk("bookins/fetchBookins", async() => {
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

export const filterBookings = createAsyncThunk("bookings/filterBookings", async(byType, thunkAPI) =>{
    const state = thunkAPI.getState();
    const { bookings } = state.bookings;
    let filteredBookings = [];
    switch(byType){
        case "Check In":
            filteredBookings = bookings.filter(booking => booking.status === "Check In");
            break;
        case "Check Out":
            filteredBookings = bookings.filter(booking => booking.status === "Check Out");
            break;
        case "In Progress":
            filteredBookings = bookings.filter(booking => booking.status === "In Progress");
            break;
        default:
            filteredBookings = bookings;
            break;
    }
    return filteredBookings;
});

export const sortBookings = createAsyncThunk("bookings/sortBookings", async(sortBy, thunkAPI) =>{
    console.log(sortBy);
    const state = thunkAPI.getState();
    const { bookings } = state.bookings;
    let orderedBookings = [];
    switch(sortBy){
        case "OrderDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
            break;
        case "CheckInDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date));
            break;
        case "CheckOutDate":
            orderedBookings = [...bookings].sort((a, b) => new Date(a.check_out_date) - new Date(b.check_out_date));
            break;
        default:
            orderedBookings = bookings;
            break;
    }
    return orderedBookings;
});

export const createBooking = createAsyncThunk("bookings/createBooking", async (newBooking, thunkAPI) => {
    const state = thunkAPI.getState();
    const { bookings } = state.bookings;
    const createdBooking = [...bookings, newBooking];
    return createdBooking;
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (updatedBooking, thunkAPI) => {
    const state = thunkAPI.getState();
    const { bookings } = state.bookings;
    const updatedBookings = bookings.map(booking => {
        if(booking.booking_id !== updatedBooking.booking_id){
            return booking;
        }
        else{
            return updatedBooking;
        }
    });
    return updatedBookings;
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (booking_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const { bookings } = state.bookings;
    const deletedBooking = bookings.filter(booking => booking.booking_id !== booking_id);
    return deletedBooking;
});

export const addHeaders = createAsyncThunk("bookings/addHeaders", (headers) => {
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
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookings.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.filteredBookings = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(fetchBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(filterBookings.fulfilled, (state, action) => {
            state.filteredBookings = action.payload;
        }).addCase(sortBookings.fulfilled, (state, action) => {
            state.filteredBookings = action.payload;
        }).addCase(createBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.filteredBookings = action.payload;
        }).addCase(createBooking.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(updateBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.filteredBookings = action.payload;
        }).addCase(updateBooking.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.filteredBookings = action.payload;
        }).addCase(deleteBooking.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(addHeaders.fulfilled, (state, action) => {
            state.tableHeaders = action.payload;
        });
    }
});

export default bookingsSlice.reducer;