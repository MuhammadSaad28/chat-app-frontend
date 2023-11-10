import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Savatar from './components/Savatar'


const App = () => {
  return (
    <Router>

      <Routes>

        <Route path='/register' element={ <Register/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/setAvatar' element={ <Savatar/> } />
        <Route path='/' element={ <Chat/> } />

      </Routes>

    </Router>
  )
}

export default App