import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import ChangePass from './components/ChangePass';
import UserProfile from './components/UserProfile';
import EmsHome from './components/EmsHome';
import EmployeeForm from './components/EmployeeForm';
import AddProfile from './components/AddProfile';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/home' element={<EmsHome/>}/>
        <Route path='/form' element={<EmployeeForm/>}/>
        <Route path='/changepass' element={<ChangePass/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/profile-form' element={<AddProfile/>}/>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
