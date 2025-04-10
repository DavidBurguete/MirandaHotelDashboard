import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Rooms from './pages/Rooms/Rooms';
import NewRoom from './pages/NewRoom/NewRoom';
import Bookings from './pages/Bookings/Bookings';
import BookingCard from './pages/BookingCard/BookingCard';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import UserAccount from './pages/UserAccount/UserAccount';
import EditRoom from './pages/EditRoom/EditRoom';
import GlobalLayout from './pages/GlobalLayout/GlobalLayout';
import Login from './pages/Login/Login';
import './styles.css';
import { useEffect, useReducer, useState } from 'react';

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

const userData = [
    {
        "user": "David Burguete",
        "email": "dburgueteg@gmail.com",
        "passwd": "Esparadrapo",
        "token": "er57rhfw35btrGbtVewffq3FB5h"
    },
    {
        "user": "admin",
        "email": "admin@localhost.com",
        "passwd": "admin",
        "token": "rtbu56BTSrww4TuKBEc1wevBN5"
    },
    {
        "user": "usuario",
        "email": "user@example.com",
        "passwd": "contrasena",
        "token": "vesHEYjr574h4V42yntKJ543vFcweG674nE"
    }
];

const initialState = {
    logged: false,
    name: null,
    email: null,
    token: null,
    error: null
}

const loginReducer = (state, action) => {
    if(action.type === "login/login"){
        const loggedUser = userData.find(u => (u.user === action.user || u.email === action.user) && u.passwd === action.passwd);
        return loggedUser !== undefined ? {
            logged: true,
            name: loggedUser.user,
            email: loggedUser.email,
            token: loggedUser.token,
            error: null
        } : {
            logged: false,
            name: null,
            email: null,
            token: null,
            error: "Wrong user or password"
        }
    }
    else if(action.type === "login/loginWithToken"){
        const loggedUser = userData.find(u => u.token === action.token);
        return loggedUser !== undefined ? {
            logged: true,
            name: loggedUser.user,
            email: loggedUser.email,
            token: loggedUser.token,
            error: null
        } : {
            logged: false,
            name: null,
            email: null,
            token: null,
            error: "There was an error on login after refresh"
        }
    }
    else if(action.type === "login/logout"){
        return {
            logged: false,
            name: null,
            email: null,
            token: null,
            error: null
        }
    }
    else{
        return state;
    }
}

function App() {
    const [ loggedAccount, loggedAccountDispatch ] = useReducer(loginReducer, initialState);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login loggedAccount={loggedAccount} loggedAccountDispatch={loggedAccountDispatch}/>}/>
                <Route path="/" element={<GlobalLayout loggedAccount={loggedAccount} loggedAccountDispatch={loggedAccountDispatch}/>}>
                    <Route index element={<Navigate to="/dashboard"/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/rooms/new" element={<NewRoom />} />
                    <Route path="/rooms/:id" element={<EditRoom />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/bookings/:id" element={<BookingCard />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<UserAccount />} />
                    <Route path="*" element={<></>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
