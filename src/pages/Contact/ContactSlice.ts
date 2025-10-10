import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { ContactInterface, ContactState } from "../../interfaces/ContactInterface";

export const fetchMessages = createAsyncThunk<ContactInterface[]>("messages/fetchMessages", async() => {
    return new Promise<ContactInterface[]>((resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL as string}/contact`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(!response.ok){
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const messages: ContactInterface[] = await response.json();
                resolve(messages.sort((a: ContactInterface, b: ContactInterface) => new Date(a.date).getDate() - new Date(b.date).getDate()));
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

export const archiveMessage = createAsyncThunk<ContactInterface[], string>("messages/archiveMessage", async(id: String) => {
    return new Promise<ContactInterface[]>(async (resolve, reject) => {
        setTimeout(async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL as string}/contact/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(!response.ok){
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const messages: ContactInterface[] = await response.json();
                resolve(messages.sort((a: ContactInterface, b: ContactInterface) => new Date(a.date).getDate() - new Date(b.date).getDate()));
            }
            catch(error){
                reject(error);
            }
        }, 200);
    });
});

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        tableHeaders: [
            "Date",
            "Customer",
            "Comment",
            "Status"
        ],
        messages: [],
        loading: true,
        error: null
    } as ContactState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state: ContactState, action) => {
            state.messages = action.payload as ContactInterface[];
            state.loading = false;
            state.error = null;
        }).addCase(fetchMessages.rejected, (state: ContactState, action) => {
            state.loading = false;
            state.error = action.error.message as string | null;
        }).addCase(archiveMessage.fulfilled, (state: ContactState, action) => {
            state.messages = action.payload as ContactInterface[];
        }).addCase(archiveMessage.rejected, (state: ContactState, action) => {
            state.error = action.error.message as string | null;
        });
    }
});

export default messagesSlice.reducer;