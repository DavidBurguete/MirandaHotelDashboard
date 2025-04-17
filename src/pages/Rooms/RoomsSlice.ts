import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Room, RoomState } from "../../interfaces/RoomInterfaces";
import { enumRoomStatus } from "../../enums/RoomEnum";

export const fetchRooms = createAsyncThunk<Room[]>("rooms/fetchRooms", async() => {
    return new Promise<Room[]>((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch("/json/Rooms.json");

                if(!response.ok){
                    throw new Error("An error occurred");
                }

                const rooms: Room[] = await response.json();
                resolve(rooms);
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const filterRooms = createAsyncThunk<Room[], string>("rooms/filterRooms", async(byType: string, thunkAPI) =>{
    const state = thunkAPI.getState() as RootState;
    const { rooms } = state.rooms;
    let filteredRooms = [] as Room[];
    switch(byType){
        case "Available":
            filteredRooms = rooms.filter((room: Room) => room.status === enumRoomStatus.Available);
            break;
        case "Booked":
            filteredRooms = rooms.filter((room: Room) => room.status === enumRoomStatus.Booked);
            break;
        default:
            filteredRooms = rooms;
            break;
    }
    return filteredRooms;
});

export const createRoom = createAsyncThunk<Room[], Room>("rooms/createRoom", async (newRoom: Room, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { rooms } = state.rooms;
    const createdRoom = [...rooms, newRoom];
    return createdRoom;
});

export const updateRoom = createAsyncThunk<Room[], Room>("rooms/updateRoom", async (updatedRoom: Room, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { rooms } = state.rooms;
    const updatedRooms = rooms.map((room: Room) => {
        if(room.room_id !== updatedRoom.room_id){
            return room;
        }
        else{
            return updatedRoom;
        }
    });
    return updatedRooms;
});

export const deleteRoom = createAsyncThunk<Room[], number>("rooms/deleteRoom", async (room_id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { rooms } = state.rooms;
    const deletedRoom = rooms.filter((room: Room) => room.room_id !== room_id);
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
    } as RoomState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state: RoomState, action) => {
            state.rooms = action.payload as Room[];
            state.filteredRooms = action.payload as Room[];
            state.loading = false;
            state.error = null;
        }).addCase(fetchRooms.rejected, (state: RoomState, action) => {
            state.loading = false;
            state.error = action.error.message as string | null;
        }).addCase(filterRooms.fulfilled, (state: RoomState, action) => {
            state.filteredRooms = action.payload as Room[];
        }).addCase(createRoom.fulfilled, (state: RoomState, action) => {
            state.rooms = action.payload as Room[];
            state.filteredRooms = action.payload as Room[];
        }).addCase(createRoom.rejected, (state: RoomState, action) => {
            state.error = action.error.message as string | null;
        }).addCase(updateRoom.fulfilled, (state: RoomState, action) => {
            state.rooms = action.payload as Room[];
            state.filteredRooms = action.payload as Room[];
        }).addCase(updateRoom.rejected, (state: RoomState, action) => {
            state.error = action.error.message as string | null;
        }).addCase(deleteRoom.fulfilled, (state: RoomState, action) => {
            state.rooms = action.payload as Room[];
            state.filteredRooms = action.payload as Room[];
        }).addCase(deleteRoom.rejected, (state: RoomState, action) => {
            state.error = action.error.message as string | null;
        });
    }
});

export default roomsSlice.reducer;