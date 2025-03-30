import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LateralMenu from './components/LateralMenu/LateralMenu';
import Header from './components/Header/Header'
import Rooms from './pages/Rooms/Rooms';
import NewRoom from './pages/NewRoom/NewRoom';
import Bookings from './pages/Bookings/Bookings';
import BookingCard from './pages/BookingCard/BookingCard';
import { PageWrapper } from './js/GlobalStyledComponents';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [ toggle, setToggle ] = useState(true);

  const Toggler = () => {
    setToggle(!toggle);
  }

  return (
    <HashRouter>
      <LateralMenu isToggled={toggle}/>
      <PageWrapper $toggleForWidth={toggle}>
        <Header Toggler={Toggler}/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/rooms/new" element={<NewRoom/>}/>
          <Route path="/bookings" element={<Bookings/>}/>
          <Route path="/bookings/:id" element={<BookingCard/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </PageWrapper>
    </HashRouter>
  )
}

export default App
