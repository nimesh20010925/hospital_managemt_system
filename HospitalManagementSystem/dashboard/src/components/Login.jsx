import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import adminloginlogo from "../assets/adminloginlogo.png"
import "./Login.css"

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigateTo = useNavigate()

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        { email, password, confirmPassword, role: 'Admin' },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      )
      toast.success(response.data.message)
      setIsAuthenticated(true)
      navigateTo('/')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='login-container'>
      <img src={adminloginlogo} alt='' className='adminloginlogo' />
      <h1 className='form-title'>Welcome to New Hope Hospital</h1>
      <p className='Admin-login-pra'>Only Admins Are Allowed to Access These Resources!</p>
      <form onSubmit={handlelogin} className='form-login'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='login-input'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='login-input'
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className='login-input'
        />
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type='submit' className='Login-button'>
            Login
          </button>
        </div>
      </form>
    </div>

  )
}

export default Login