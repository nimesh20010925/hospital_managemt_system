import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./AddNewAdmin.css";

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const addnewadmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/admin/addnew',
        { firstName, lastName, email, phone, nic, dob, gender, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(response.data.message);
      navigateTo('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className='add-admin-page'>
      <div className='admin-register-container'>
        <div className='admin-register-form-component'>
          <div className='admin-register-form'>
            <h2 className='admin-register-title'>Add Admin</h2>
            <form onSubmit={addnewadmin} className='add-admin-form'>
              <div className='form-group'>
                <input
                  type="text"
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type="number"
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  placeholder='NIC'
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <input
                  type="date"
                  placeholder='Date of Birth'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group'>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className='admin-register-select'
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className='form-group'>
                <input
                  type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='admin-register-input'
                />
              </div>
              <div className='form-group submit-btn-wrapper'>
                <button type='submit' className='admin-register-button'>
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewAdmin;
