import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoctorHolder from "../assets/doctorHolder.jpg";
import './AddNewDoctor.css';

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const navigateTo = useNavigate();


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

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const addnewdoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post(
        'http://localhost:4000/api/v1/user/doctor/addnew',
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success(response.data.message);
      navigateTo('/doctors');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className='add-doctor-page'>
      <div className='doctor-register-container'>
        <div className='doctor-register-form-component'>
          <div className='doctor-register-form'>
            <h2 className='doctor-register-title'>Add Doctor</h2>
            <form onSubmit={addnewdoctor} className='add-doctor-form'>
              <div className='avatar-upload'>
                <img
                  src={docAvatarPreview ? `${docAvatarPreview}` : DoctorHolder}
                  alt='Doctor Avatar'
                  className='doctor-avatar-preview'
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className='avatar-input'
                  placeholder='Doctor Image'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="text"
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="text"
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="number"
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="text"
                  placeholder='NIC'
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <input
                  type="date"
                  placeholder='Date of Birth'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className='doctor-register-select'
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className='doctor-form-group'>
                <input
                  type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='doctor-register-input'
                />
              </div>
              <div className='doctor-form-group'>
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  className='doctor-register-select'
                >
                  <option value="">Select Department</option>
                {
                  departmentArray.map((element,index)=>{
                    return(
                      <option value={element} key={index}>{element} </option>
                    )
                  })
                }
                </select>
              </div>
              
              <div className='doctor-form-group submit-btn-wrapper'>
                <button type='submit' className='doctor-register-button'>
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewDoctor;
