import React from 'react';
import heroimage from "../assets/Hero.png";
import backgroundImage from "../assets/backgroundimage.webp"; // Background image
import "./Hero.css"
const Hero = () => {
  return (
    <div 
      className='hero container' 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '50px 20px',
        color: 'white' // Ensures text is readable against the background
      }}
    >
      <div className="banner">
      <div className="bannerdiscripsion">
        <h1>NewHope Medical Center</h1>
        <p>
          NewHope Medical Center is a modern healthcare institution committed to 
          providing compassionate, high-quality medical care to its community. 
          Offering a wide range of services including emergency care, advanced surgical procedures, 
          diagnostics, and both inpatient and outpatient treatments, 
        </p>
        </div>
      </div>
      <div className="banner">
        <img src={heroimage} alt='NewHope Medical Center banner'  className='heroimage'/>
      </div>
    </div>
  );
};

export default Hero;
