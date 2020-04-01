import PropTypes from 'prop-types';
import React, { useState } from 'react';
import sampleFishes from '../../sample-fishes';
import AddFishForm from '../AddFishForm/AddFishForm';
import EditFishForm from '../EditFishForm/EditFishForm';
import './Inventory.scss';
import { Redirect } from 'react-router-dom';

const Inventory = props => {
  const [fishes, setFishes] = useState({});

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
  };

  if (localStorage.getItem('token') == null) {
    return <Redirect to='/' />;
  }
  return (
    <div className='inventory'>
      <h1>Inventory</h1>
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
      <button onClick={loadSampleFishes}>Load sample fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func
};

export default Inventory;
