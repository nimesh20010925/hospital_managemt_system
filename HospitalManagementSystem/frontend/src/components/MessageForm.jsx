import React, { useState } from 'react';
import './MessageForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasttName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleMessage = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/message/send',
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      toast.success(res.data.message);

      // Clear the form fields after submission
      setFirstName('');
      setLasttName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='message-container form-component message-form'>
      <h1 className='Message-h1'>Send Us A Message</h1>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='message-input'
          />
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLasttName(e.target.value)}
            className='message-input'
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='message-input'
          />
          <input
            type='text'
            placeholder='Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='message-input'
          />
        </div>
        <textarea
          rows={7}
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='message-input'
        ></textarea>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type='submit' className='send-button'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
