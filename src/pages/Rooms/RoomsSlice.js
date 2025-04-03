import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async() => {
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch("/json/Rooms.json");

                if(!response.ok){
                    throw new Error("An error occurred");
                }

                const rooms = await response.json();
                resolve(rooms);
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const filterRooms = createAsyncThunk("rooms/filterRooms", async(byType, thunkAPI) =>{
    const state = thunkAPI.getState();
    const { rooms } = state.rooms;
    let filteredRooms = [];
    switch(byType){
        case "Available":
            filteredRooms = rooms.filter(room => room.status === "Available");
            break;
        case "Booked":
            filteredRooms = rooms.filter(room => room.status === "Booked");
            break;
        default:
            filteredRooms = rooms;
            break;
    }
    return filteredRooms;
});

export const createRoom = createAsyncThunk("rooms/createRoom", async (newRoom, thunkAPI) => {
    const state = thunkAPI.getState();
    const { rooms } = state.rooms;
    const createdRoom = [...rooms, newRoom];
    return createdRoom;
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (updatedRoom, thunkAPI) => {
    const state = thunkAPI.getState();
    const { rooms } = state.rooms;
    const updatedRooms = rooms.map(room => {
        if(room.room_id !== updatedRoom.room_id){
            return room;
        }
        else{
            return updatedRoom;
        }
    });
    return updatedRooms;
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (room_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const { rooms } = state.rooms;
    const deletedRoom = rooms.filter(room => room.room_id !== room_id);
    console.log(room_id);
    console.log(deletedRoom);
    return deletedRoom;
});

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        tableHeaders: [
            "Room Name",
            "Room Type",
            "Amenities",
            "Price",
            "Status"
        ],
        rooms: [],
        filteredRooms: [],
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.filteredRooms = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(fetchRooms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(filterRooms.fulfilled, (state, action) => {
            state.filteredRooms = action.payload;
        }).addCase(createRoom.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.filteredRooms = action.payload;
        }).addCase(createRoom.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(updateRoom.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.filteredRooms = action.payload;
        }).addCase(updateRoom.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deleteRoom.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.filteredRooms = action.payload;
        }).addCase(deleteRoom.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export default roomsSlice.reducer;