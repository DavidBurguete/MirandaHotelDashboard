import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Room, RoomState } from "../../interfaces/RoomInterfaces";
import { enumRoomStatus } from "../../enums/RoomEnum";

export const fetchRooms = createAsyncThunk<Room[]>("rooms/fetchRooms", async() => {
    return new Promise<Room[]>((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL as string}/rooms`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(!response.ok){
                    const error = await response.json();
                    throw new Error(error.message);
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
    return new Promise<Room[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/rooms/new`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newRoom
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            const rooms: Room = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { rooms } = state.rooms;
        const createdRoom = [...rooms, newRoom];
        resolve(createdRoom);
    });
});

export const updateRoom = createAsyncThunk<Room[], Room>("rooms/updateRoom", async (updatedRoom: Room, thunkAPI) => {
    return new Promise<Room[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/rooms/${updatedRoom._id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    updatedRoom
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            const rooms: Room = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { rooms } = state.rooms;
        const updatedRooms = rooms.map((room: Room) => {
            if(room._id !== updatedRoom._id){
                return room;
            }
            else{
                return updatedRoom;
            }
        });
        resolve(updatedRooms);
    });
});

export const deleteRoom = createAsyncThunk<Room[], string>("rooms/deleteRoom", async (room_id: string, thunkAPI) => {
    return new Promise<Room[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/rooms/${room_id}`, {
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

            const rooms: Room = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { rooms } = state.rooms;
        const deletedRoom = rooms.filter((room: Room) => room._id !== room_id);
        resolve(deletedRoom);
    });
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