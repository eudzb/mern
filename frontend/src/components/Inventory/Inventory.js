import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AddFishForm from '../AddFishForm/AddFishForm';
import EditFishForm from '../EditFishForm/EditFishForm';
import './Inventory.scss';
import { Redirect } from 'react-router-dom';

const Inventory = props => {
  const [fishes, setFishes] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/fish')
      .then(response => response.json())
      .then(responseData => {
        setFishes(responseData);
      })
      .catch(error => console.warn(error));
  }, [fishes]);

  if (localStorage.getItem('token') == null) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='my-5 mx-xl-auto mx-4 inventory text-center'>
      <h1 className='text-uppercase text-dark text-inventory font-weight-bold mb-4'>Inventory</h1>
      {Object.keys(fishes).map(key => (
        <EditFishForm
          fish={fishes[key]}
          key={key}
          index={key}
          updateFish={props.updateFish}
          deleteFish={props.deleteFish}
        />
      ))}
      <AddFishForm addFish={props.addFish} />
    </div>
  );
};

Inventory.propTypes = {
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func
};

export default Inventory;
