import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchUsers = async () => {
    try{
        const response = await fetch("/json/Users.json");

        if(!response.ok){
            throw new Error("An error occurred");
        }

        return await response.json();
    }
    catch(error){
        throw new Error(error);
    }
}

export const login = createAsyncThunk("login/login", async ({user, passwd}) => {
    const userData = await fetchUsers();
    return userData.find(u => (u.user === user || u.email === user) && u.passwd === passwd);
});

export const loginWithToken = createAsyncThunk("login/loginWithToken", async (token) => {
    const userData = await fetchUsers();
    return userData.find(u => u.token === token);
});

const accountSlice = createSlice({
    name: "account",
    initialState: {
        logged: false,
        name: null,
        email: null,
        passwd: null,
        token: null,
        error: null
    },
    reducers: {
        logOut: (state) => {
            state.logged = false;
            state.name = null;
            state.email = null;
            state.passwd = null;
            state.token = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload !== undefined){
                state.logged = true;
                state.name = action.payload.user;
                state.email = action.payload.email;
                state.passwd = action.payload.passwd;
                state.token = action.payload.token;
            }
            else{
                state.error = "Incorrect user or password";
            }
        }).addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
        }).addCase(loginWithToken.fulfilled, (state, action) => {
            if(action.payload !== undefined){
                state.logged = true;
                state.name = action.payload.user;
                state.email = action.payload.email;
                state.passwd = action.payload.passwd;
                state.token = action.payload.token;
            }
            else{
                state.error = "User not found";
            }
        })
    }
});

export const {
    logOut
} = accountSlice.actions;

export default accountSlice.reducer;