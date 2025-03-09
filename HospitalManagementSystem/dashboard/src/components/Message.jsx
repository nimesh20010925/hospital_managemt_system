import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import "./Message.css"

const Message = () => {
  const [messages, setMessages] = useState([])
  const { isAuthenticated } = useContext(Context)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/message/getAllMessage", { withCredentials: true })
        setMessages(data.messages)
      } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING MESSAGES:", error)
      }
    }
    fetchMessages()
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <section className='page-messages'>
      <h1>All Messages</h1>
      <div className="message-table-container">
        {
          messages && messages.length > 0 ? (
            <table className="message-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((element) => (
                  <tr key={element._id}>
                    <td>{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                    <td>{element.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<h2>No messages!</h2>)
        }
      </div>
    </section>
  )
}

export default Message
