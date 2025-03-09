import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import pediatricsImage from '../assets/Biorgraphyimage.jpg'
import operation from '../assets/operation.jpg'
import "./Department.css"
const Department = () => {
  const departmentArray = [
    {
      name: 'Pediatrics',
      imageUrl: pediatricsImage, // Use the imported image
    },
    {
        name: 'Pediatrics',
        imageUrl: operation, // Use the imported image
      },
      {
        name: 'Pediatrics',
        imageUrl: pediatricsImage, // Use the imported image
      },
      {
        name: 'Pediatrics',
        imageUrl: pediatricsImage, // Use the imported image
      },
    // Add more departments as needed
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='department'>
      <h1>Department</h1>
      <Carousel responsive={responsive}>
        {departmentArray.map((depart, index) => {
          return (
            <div className="card" key={index}>
              <div className="depart-name">
                {depart.name}
              </div>
              <img src={depart.imageUrl} alt='' className='depart-image'/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Department;
