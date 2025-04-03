import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LateralMenu from './components/LateralMenu/LateralMenu';
import Header from './components/Header/Header'
import Rooms from './pages/Rooms/Rooms';
import NewRoom from './pages/NewRoom/NewRoom';
import Bookings from './pages/Bookings/Bookings';
import BookingCard from './pages/BookingCard/BookingCard';
import { PageWrapper } from './js/GlobalStyledComponents';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import UserAccount from './pages/UserAccount/UserAccount';
import EditRoom from './pages/EditRoom/EditRoom';

function App() {
    const [toggle, setToggle] = useState(true);
    const account = useSelector(state => state.account);

    const Toggler = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (account.logged) {
            localStorage.setItem("token", account.token);
        }
    }, [account]);

    return (
        <BrowserRouter>
            {account.logged ? <>
                <LateralMenu isToggled={toggle} />
                <PageWrapper $toggleForWidth={toggle}>
                    <Header Toggler={Toggler} />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/rooms/new" element={<NewRoom />} />
                        <Route path="/rooms/:id" element={<EditRoom />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/bookings/:id" element={<BookingCard />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/account" element={<UserAccount />} />
                    </Routes>
                </PageWrapper> </> :
                <Login></Login>
            }
        </BrowserRouter>
    )
}

export default App
