import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../pages/Login/accountSlice";
import roomsReducer from "../pages/Rooms/RoomsSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        rooms: roomsReducer
    }
});

export default store;