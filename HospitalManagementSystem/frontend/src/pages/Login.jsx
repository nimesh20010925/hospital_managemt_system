import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =useState("")
  const navigateTo = useNavigate()

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        { email, password,confirmPassword,role: 'Patient' },
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
      <div className='login-form'>
        <h2 className='login-h2'>Sign in</h2>
        <p className='login-p1'>Please Login to Continue</p>
        <p className='login-p2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias beatae eum repellat minima nam maiores, hic placeat aspernatur nemo molestiae in reprehenderit quae voluptate.
        </p>
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
          <div style={{ gap: '10px', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <p className='not-register'>Not Registered?</p>
            <Link to={'/register'}>Register Now</Link>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button type='submit' className='Login-button'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
