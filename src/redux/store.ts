import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../pages/Rooms/RoomsSlice";
import bookingsReducer from "../pages/Bookings/BookingsSlice";
import usersReducer from "../pages/Users/UsersSlice";
import contactReducer from "../pages/Contact/ContactSlice";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        bookings: bookingsReducer,
        users: usersReducer,
        messages: contactReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type useAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export default store;