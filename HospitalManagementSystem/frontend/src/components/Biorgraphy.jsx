import React from 'react'
import Biorgraphyimage from "../assets/Biorgraphyimage.jpg"
import "./Biorgraphy.css"
const Biorgraphy = () => {
  return (
    <div className='Biorgraphy'>
        
        <div className="Biorgraphy-container">
        <h1 className='Biorgraphy-h1'>Biorgraphy</h1>
        <div className="container-left">
            <img src={Biorgraphyimage} alt=''className='Biorgraphyimage'/>
        </div>
        <div className="container-right">
        <p>
            NewHope Medical Center is a modern healthcare institution committed to 
          providing compassionate, high-quality medical care to its community. 
          Offering a wide range of services including emergency care, advanced surgical procedures, 
          diagnostics, and both inpatient and outpatient treatments, NewHope Medical Center 
          is dedicated to improving patient outcomes. Staffed by highly trained doctors, nurses, 
          and medical professionals, the center focuses on delivering personalized healthcare solutions, 
          ensuring every patient receives the best possible treatment. With a mission to bring new hope 
          to health and recovery, the center strives to be a trusted partner in promoting well-being and healing.
            </p>
        </div>
        </div>
    </div>
  )
}

export default Biorgraphy