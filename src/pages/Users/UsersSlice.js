import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async() => {
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch("/json/Users.json");

                if(!response.ok){
                    throw new Error("An error occurred");
                }

                const users = await response.json();
                resolve(users);
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const createUser = createAsyncThunk("users/createUser", async (newUser, thunkAPI) => {
    const state = thunkAPI.getState();
    const { users } = state.users;
    const createdUser = [...users, newUser];
    return createdUser;
});

export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser, thunkAPI) => {
    const state = thunkAPI.getState();
    const { users } = state.users;
    const updatedUsers = users.map(user => {
        if(user.id !== parseInt(updatedUser.id)){
            return user;
        }
        else{
            return updatedUser;
        }
    });
    return updatedUsers;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (user_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const { users } = state.users;
    const deletedUser = users.filter(user => user.id !== user_id);
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
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(createUser.fulfilled, (state, action) => {
            state.users = action.payload;
        }).addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.users = action.payload;
        }).addCase(updateUser.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.users = action.payload;
        }).addCase(deleteUser.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export default usersSlice.reducer;