import React, { useContext, useEffect } from 'react'
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Login from './pages/Login'
import Register from './pages/Register'
import AboutUs from './pages/AboutUs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import { Context } from './main'
import axios from 'axios'
import Footer from './components/footer'

const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser } = useContext(Context)
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials:true})
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
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
        <Footer/>
      </Router>
    </>
  )
}

export default App