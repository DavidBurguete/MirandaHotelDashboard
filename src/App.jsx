import { HashRouter } from 'react-router-dom'
import LateralMenu from './components/LateralMenu'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [ toggle, setToggle ] = useState(false);

  const Toggler = () => {
    setToggle(!toggle);
  }

  return (
    <HashRouter>
      <LateralMenu isToggled={toggle}/>
      <Header Toggler={Toggler}/>
    </HashRouter>
  )
}

export default App
