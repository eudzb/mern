import React, { useEffect, useState } from 'react';
import Fish from '../Fish/Fish';
import './Home.scss';

const Home = () => {
  const [fishes, setFishes] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/fish')
      .then(response => response.json())
      .then(responseData => {
        setFishes(responseData);
      })
      .catch(error => console.warn(error));
  }, [fishes]);

  return (
    <div className='container my-5'>
      <h1 className='text-uppercase text-dark text-fishes font-weight-bold mb-4'>Fishes</h1>
      <ul>
        {Object.keys(fishes).map(key => (
          <Fish key={key} index={key} details={fishes[key]} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
