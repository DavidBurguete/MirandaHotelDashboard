import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../pages/Login/accountSlice";
import roomsReducer from "../pages/Rooms/RoomsSlice";
import bookingsReducer from "../pages/Bookings/BookingsSlice";
import usersReducer from "../pages/Users/UsersSlice";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        account: accountReducer,
        rooms: roomsReducer,
        bookings: bookingsReducer,
        users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type useAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export default store;