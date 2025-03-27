import { HashRouter, Route, Routes } from 'react-router-dom'
import LateralMenu from './components/LateralMenu/LateralMenu';
import Header from './components/Header/Header'
import { useState } from 'react'
import Rooms from './pages/Rooms';
import NewRoom from './pages/NewRoom/NewRoom';
import Bookings from './pages/Bookings';

function App() {
  const [ toggle, setToggle ] = useState(true);

  const Toggler = () => {
    setToggle(!toggle);
  }

  return (
    <HashRouter>
      <LateralMenu isToggled={toggle}/>
      <div className="main">
        <Header Toggler={Toggler}/>
        <Routes>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/rooms/new" element={<NewRoom/>}/>
          <Route path="/bookings" element={<Bookings/>}/>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
