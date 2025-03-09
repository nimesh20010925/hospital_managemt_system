import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirect
import './Doctor.css';
import {AiFillDelete } from 'react-icons/ai';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true });
        console.log('Fetched Doctors Data:', data); // Log fetched doctor data
        setDoctors(data.doctors);
       // console.log('Doctor Avatar URL:', element.docAvatar.url);
      } catch (error) {
        const message = error.response?.data?.message || 'Error fetching doctors';
        setError(message);
        toast.error(message);
        console.error(error); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/user/doctors/${id}`, { withCredentials: true });
        setDoctors(doctors.filter((doctor) => doctor._id !== id)); // Update local state
        toast.success("Doctor deleted successfully!");
      } catch (error) {
        const message = error.response?.data?.message || 'Error deleting doctor';
        toast.error(message);
        console.error(error); // Log the error for debugging
      }
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Display loading indicator
  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  return (
    <section className='page-doctor'>
      <h1 className='doctors-h1'>All Doctors</h1>
      <div className="doctor-table-container">
        {error ? (
          <h2 className="error-message">{error}</h2>
        ) : (
          doctors && doctors.length > 0 ? (
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor Image</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Date of Birth</th>
                  <th>NIC</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
  {doctors.map((element) => {
    const formattedDOB = new Date(element.dob).toLocaleDateString(); // Format date of birth
    const fullImageUrl = `http://localhost:4000${element.docAvatar?.url}`;
    return (
      <tr key={element._id}>
         <td>
        <img 
          src={fullImageUrl} // Use the full image URL
          alt={`${element.firstName} ${element.lastName}`} // Alt text
          onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // Fallback image
        />
      </td>
        <td>{element.firstName}</td>
        <td>{element.lastName}</td>
        <td>{element.email}</td>
        <td>{element.phone}</td>
        <td>{formattedDOB}</td> {/* Display formatted DOB */}
        <td>{element.nic}</td>
        <td>{element.gender}</td>
        <td>{element.doctorDepartment}</td>
        <td>
          <button onClick={() => handleDelete(element._id)} className="delete-button"> <AiFillDelete className="delete-icon" /></button>
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
          ) : (
            <h2>No doctors available!</h2>
          )
        )}
      </div>
    </section>
  );
}

export default Doctor;
