import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Doctor from './components/Doctor'
import AddNewAdmin from './components/AddNewAdmin'
import AddNewDoctor from './components/AddNewDoctor'
import Message from './components/Message'
import Sidebar from './components/Sidebar'
import { Context } from './main'
import axios from 'axios'
const App = () => {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context)

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me",{withCredentials:true})
        setIsAuthenticated(true)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
        
      }
      
    }
    fetchUser()
  },[isAuthenticated])

  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
          <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
          <Route path='/messages' element={<Message/>}/>
          <Route path='/doctors' element={<Doctor/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App