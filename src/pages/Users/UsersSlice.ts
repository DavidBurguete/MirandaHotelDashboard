import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { User, UserState } from "../../interfaces/UserInterfaces";

export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async() => {
    return new Promise<User[]>((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch("/json/Users.json");

                if(!response.ok){
                    throw new Error("An error occurred");
                }

                const users: User[] = await response.json();
                resolve(users);
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const createUser = createAsyncThunk<User[], User>("users/createUser", async (newUser: User, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { users } = state.users;
    const createdUser = [...users, newUser];
    return createdUser;
});

export const updateUser = createAsyncThunk<User[], User>("users/updateUser", async (updatedUser: User, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { users } = state.users;
    const updatedUsers = users.map((user: User) => {
        if(user.id !== updatedUser.id){
            return user;
        }
        else{
            return updatedUser;
        }
    });
    return updatedUsers;
});

export const deleteUser = createAsyncThunk<User[], number>("users/deleteUser", async (user_id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { users } = state.users;
    const deletedUser = users.filter((user: User) => user.id !== user_id);
    return deletedUser;
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        tableHeaders: [
            "User",
            "Email",
            "Password"
        ],
        users: [],
        loading: true,
        error: null
    } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state: UserState, action) => {
            state.users = action.payload as User[];
            state.loading = false;
            state.error = null;
        }).addCase(fetchUsers.rejected, (state: UserState, action) => {
            state.loading = false;
            state.error = action.error.message as string | null;
        }).addCase(createUser.fulfilled, (state: UserState, action) => {
            state.users = action.payload as User[];
        }).addCase(createUser.rejected, (state: UserState, action) => {
            state.error = action.error.message as string | null;
        }).addCase(updateUser.fulfilled, (state: UserState, action) => {
            state.users = action.payload as User[];
        }).addCase(updateUser.rejected, (state: UserState, action) => {
            state.error = action.error.message as string | null;
        }).addCase(deleteUser.fulfilled, (state: UserState, action) => {
            state.users = action.payload as User[];
        }).addCase(deleteUser.rejected, (state: UserState, action) => {
            state.error = action.error.message as string | null;
        });
    }
});

export default usersSlice.reducer;