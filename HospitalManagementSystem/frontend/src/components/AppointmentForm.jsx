import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./AppointmentForm.css"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AppointmentForm = () => {
    
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [nic,setNic] = useState("")
  const [dob,setDob] = useState("")
  const [gender,setGender] = useState("")
  const [appointment_date,setAppointment_date] = useState("")
  const [department,setDepartment] = useState("")
  const [doctor_firstName,setDoctor_firstName] = useState("")
  const [doctor_lasttName,setDoctor_lasttName] = useState("")
  const [address,setAddress] = useState("")
  const [hasVisited,setHasVisited] = useState("")

  const departmentArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT"
  ]

  const navigateTo = useNavigate()

  const [doctors,setDoctors] = useState([])

  useEffect(()=>{
    const fetchDoctors =async()=>{
        const {data} = await axios.get("http://localhost:4000/api/v1/user/doctors",{withCredentials:true})
        setDoctors(data.doctors)
    }
    fetchDoctors()
  },[])

  const handleAppointment = async(e)=>{
    e.preventDefault()
    try {
        const hashVisitedBool =Boolean(hasVisited)
        const {data} = await axios.post("http://localhost:4000/api/v1/appointment/post",{
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            appointment_date,
            department,
            doctor_firstName,
            doctor_lasttName,
            address,
            hasVisited :hashVisitedBool
        },{withCredentials:true,headers: { 'Content-Type': 'application/json' }})
        toast.success(data.message)
        navigateTo("/")
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }
  
  return (
    <div className='appointment-container'>
    <div className='appointment-form-component'>
      <div className='appointment-form'>
        <h2 className='appointment-h2'>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} className='appointment-input'/>
            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} className='appointment-input'/>
          </div>
          <div>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='appointment-input'/>
            <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} className='appointment-input'/>
          </div>
          <div>
            <input type="text" placeholder='NIC' value={nic} onChange={(e)=>setNic(e.target.value)} className='appointment-input'/>
            <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} className='appointment-input'/>
          </div>
          <div>
            <select value={gender} onChange={(e)=>setGender(e.target.value)} className='appointment-select'>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type='date' value={appointment_date} onChange={(e)=>setAppointment_date(e.target.value)} className='appointment-input'/>
          </div>
          <div>
            
           <select value={department} onChange={(e)=>{
            setDepartment(e.target.value);
            setDoctor_firstName("");
            setDoctor_lasttName("");
            }} className='appointment-select'>
                 <option value="">Select Department</option>
                {departmentArray.map((depart,index)=>{
                    return(
                       
                        <option value={depart} key={index}>
                            {depart}
                        </option>
                    )
                })}
           </select>
           <select value={`${doctor_firstName} ${doctor_lasttName}`} onChange={(e)=>{
            const [firstName,lastName] = e.target.value.split(" ");
            setDoctor_firstName(firstName)
            setDoctor_lasttName(lastName)
           }}disabled={!department}
           className='appointment-select'>
            <option value="">Select Doctor</option>
            {
                doctors.filter(doctor=>doctor.doctorDepartment === department).map((doctor,index)=>{
                    return(
                        <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                            {doctor.firstName} {doctor.lastName}
                        </option>
                    )
                })
            }
           </select>

          </div>
          <textarea rows="10" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Address' className='appointment-textarea'/>
            <div style={{ gap: '10px', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <p style={{marginBottom:"0px"}}>have you visite before?</p>
                <input type='checkbox' checked={hasVisited} onChange={(e)=>setHasVisited(e.target.checked)}/>
                </div>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type='submit' className='appointment-button'>
            Get Appointment
          </button>
        </div>
        </form>

      </div>

    </div>

  </div>
  )
}

export default AppointmentForm