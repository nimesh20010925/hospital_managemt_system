import React, { useContext, useState } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import "./Register.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [nic,setNic] = useState("")
  const [dob,setDob] = useState("")
  const [gender,setGender] = useState("")
  const [password,setPassword] = useState("")

  const navigateTo = useNavigate()

  const handelRegister = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user//patient/register',
        { firstName,lastName,email,phone,nic,dob,gender,password,role: 'Patient' },
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

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <div className='register-container'>
      <div className='register-form-component'>
        <div className='register-form'>
          <h2 className='register-h2'>Sign Up</h2>
          <p className='register-pra'>Please Sign Up To Continue</p>
          <p className='register-par2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad commodi, neque veniam non eaque, architecto placeat deserunt reprehenderit aspernatur quo necessitatibus tempore exercitationem ut animi voluptates eos voluptatem? Eaque, officiis!</p>
          <form onSubmit={handelRegister}>
            <div>
              <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} className='register-input'/>
              <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} className='register-input'/>
            </div>
            <div>
              <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='register-input'/>
              <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} className='register-input'/>
            </div>
            <div>
              <input type="text" placeholder='NIC' value={nic} onChange={(e)=>setNic(e.target.value)} className='register-input'/>
              <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} className='register-input'/>
            </div>
            <div>
              <select value={gender} onChange={(e)=>setGender(e.target.value)} className='register-select'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='register-input'/>
            </div>
            <div style={{ gap: '10px', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <p className='not-register'>Alredy Registered?</p>
            <Link to={'/login'}>Login Now</Link>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            <button type='submit' className='register-button'>
              Sign Up
            </button>
          </div>
          </form>

        </div>

      </div>

    </div>
  )
}

export default Register