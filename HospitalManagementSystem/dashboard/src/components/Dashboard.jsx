import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import doc from '../assets/Hero.png';
import './Dashboard.css';
import { GoCheckCircleFill } from 'react-icons/go';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);

  const [appointment, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/appointment/getall',
          { withCredentials: true }
        );
        setAppointments(data.appointment);
      } catch (error) {
        setError('Failed to fetch appointments');
        setAppointments([]);
        console.error('Error while fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app._id === appointmentId ? { ...app, status } : app
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app._id !== appointmentId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete appointment');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="dashboard-banner">
          <div className="first-box">
            <img src={doc} alt="User" className="user-img" />
            <div className="dashboard-content">
              <div>
                <p className="welcome-message">Hello,</p>
                <h5 className="user-name">
                  {user && `${user.firstName} ${user.lastName}`}
                </h5>
              </div>
              <p className="dashboard-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                porro ipsa aperiam quos cum voluptatem recusandae excepturi
                saepe ipsum enim suscipit mollitia quisquam,
              </p>
            </div>
          </div>
          <div className="second-box">
            <p className="box-title">Total Appointments</p>
            <h3 className="box-value">1500</h3>
          </div>
          <div className="third-box">
            <p className="box-title">Registered Doctors</p>
            <h3 className="box-value">20</h3>
          </div>
        </div>

        <div className="dashboard-banner2">
          <h5 className="appointments-title">All Appointments</h5>
          {error && <p className="error-message">{error}</p>}
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((app) => (
                  <tr key={app._id}>
                    <td>{`${app.firstName} ${app.lastName}`}</td>
                    <td>{new Date(app.appointment_date).toLocaleDateString()}</td>
                    <td>{`${app.doctor.firstName} ${app.doctor.lastName}`}</td>
                    <td>{app.department}</td>
                    <td>
                      <select
                        className={`status-select ${app.status.toLowerCase()}`}
                        value={app.status}
                        onChange={(e) =>
                          handleUpdateStatus(app._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {app.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteAppointment(app._id)}
                      >
                        <AiFillDelete className="delete-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <h1 className="no-appointments">No Appointments</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
