import React from 'react'
import Forgotpassword from './components/Forgotpassword'
import { Route, Routes } from 'react-router-dom'
import Resetpassword from './components/Resetpassword'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/resetpassword' element={<Resetpassword/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App