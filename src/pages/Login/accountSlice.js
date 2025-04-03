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

export const createAccount = createAsyncThunk("account/createAccount", async ({user, email, passwd, token}) => {
    const userData = await fetchUsers();
    const newUser = {
        "user": user,
        "email": email,
        "passwd": passwd,
        "token": token
    };
    userData.push(newUser);
    return newUser;
});

export const updateAccount = createAsyncThunk("account/updateAccount", async ({user, email, passwd, token}) => {
    const userData = await fetchUsers();
    const updateUserData = userData.map((updateUser) => {
        if (updateUser.token === token) {
          return {
            ...updateUser,
            user: user,
            email: email,
            passwd: passwd
          };
        }
        return updateUser;
    });
    return {
        "user": user,
        "email": email,
        "passwd": passwd,
        "token": token
    };
});

export const deleteAccount = createAsyncThunk("account/deleteAccount", async (token) => {
    const userData = await fetchUsers();
    const dataWithDeletedUser = userData.filter(user => user.token !== token);
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
        }).addCase(createAccount.fulfilled, (state, action) => {
            state.logged = true;
            state.name = action.payload.user;
            state.email = action.payload.email;
            state.passwd = action.payload.passwd;
            state.token = action.payload.token;
        }).addCase(updateAccount.fulfilled, (state, action) => {
            state.name = action.payload.user;
            state.email = action.payload.email;
            state.passwd = action.payload.passwd;
            state.token = action.payload.token;
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.logged = false;
            state.name = null;
            state.email = null;
            state.passwd = null;
            state.token = null;
        });
    }
});

export const {
    logOut
} = accountSlice.actions;

export default accountSlice.reducer;