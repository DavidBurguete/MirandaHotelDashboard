import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Rooms from './pages/Rooms/Rooms';
import NewRoom from './pages/NewRoom/NewRoom';
import Bookings from './pages/Bookings/Bookings';
import BookingCard from './pages/BookingCard/BookingCard';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import EditRoom from './pages/EditRoom/EditRoom';
import GlobalLayout from './pages/GlobalLayout/GlobalLayout';
import Login from './pages/Login/Login';
import './styles.css';
import NewBooking from './pages/NewBooking/NewBooking';
import Users from './pages/Users/Users';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import EditAccount from './pages/EditAccount/EditAccount';
import { LoggedAccountProvider } from './pages/Login/LoggedAccountContext';

function App() {

    return (
        <LoggedAccountProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/" element={<GlobalLayout />}>
                        <Route index element={<Navigate to="/dashboard"/>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/rooms/new" element={<NewRoom />} />
                        <Route path="/rooms/:id" element={<EditRoom />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/bookings/new" element={<NewBooking />} />
                        <Route path="/bookings/:id" element={<BookingCard />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/new" element={<CreateAccount/>} />
                        <Route path="/users/:id" element={<EditAccount/>} />
                        <Route path="*" element={<></>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LoggedAccountProvider>
    )
}

export default App
