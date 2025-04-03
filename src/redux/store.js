import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../pages/Login/accountSlice";
import roomsReducer from "../pages/Rooms/RoomsSlice";
import bookingsReducer from "../pages/Bookings/BookingsSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        rooms: roomsReducer,
        bookings: bookingsReducer
    }
});

export default store;