import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { User, UserState } from "../../interfaces/UserInterfaces";

export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async() => {
    return new Promise<User[]>((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL as string}/users`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(!response.ok){
                    const error = await response.json();
                    throw new Error(error.message);
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
    return new Promise<User[]>(async (resolve, reject) => {
        let user = {} as User;
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/users/new`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: newUser.user,
                    email: newUser.email,
                    passwd: newUser.passwd,
                    token: newUser.token
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            user = await response.json();
        }
        catch(error){
            console.log(error);
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { users } = state.users;
        const createdUser = [...users, user];
        resolve(createdUser);
    });
});

export const updateUser = createAsyncThunk<User[], User>("users/updateUser", async (updatedUser: User, thunkAPI) => {
    return new Promise<User[]>(async (resolve, reject) => {
        let user = {} as User;
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/users/${updatedUser._id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: updatedUser.user,
                    email: updatedUser.email,
                    passwd: updatedUser.passwd,
                    token: updatedUser.token
                })
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }

            user = await response.json();
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { users } = state.users;
        const updatedUsers = users.map((userIterated: User) => {
            if(userIterated._id !== updatedUser._id){
                return userIterated;
            }
            else{
                console.log("A");
                return user;
            }
        });
        resolve(updatedUsers);
    });
});

export const deleteUser = createAsyncThunk<User[], string>("users/deleteUser", async (user_id: string, thunkAPI) => {
    return new Promise<User[]>(async (resolve, reject) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL as string}/users/${user_id}`, {
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
        }
        catch(error){
            reject(error);
        }
        const state = thunkAPI.getState() as RootState;
        const { users } = state.users;
        const deletedUser = users.filter((user: User) => user._id !== user_id);
        resolve(deletedUser);
    });
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