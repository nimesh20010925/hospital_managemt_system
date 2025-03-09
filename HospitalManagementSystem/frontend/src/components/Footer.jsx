import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Logo and description */}
        <div className='footer-section'>
          <h2 className='footer-logo'>MyWebsite</h2>
          <p className='footer-description'>
            Your trusted source for amazing products and services. Stay connected with us on social media!
          </p>
        </div>

        {/* Links */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Quick Links</h3>
          <ul className='footer-links'>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/services'>Services</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/privacy'>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Contact Us</h3>
          <p>Email: support@mywebsite.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Main St, Anytown, USA</p>
        </div>

        {/* Social Media Icons */}
        <div className='footer-section'>
          <h3 className='footer-heading'>Follow Us</h3>
          <div className='footer-social'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter'></i>
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin-in'></i>
            </a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
