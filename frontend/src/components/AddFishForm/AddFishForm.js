import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './AddFishForm.scss';

const AddFishForm = props => {
  const [fish, setFish] = useState({
    name: '',
    price: 0,
    status: 'available',
    desc: '',
    image: ''
  });

  const onChange = name => event => {
    let newFish = { ...fish };
    newFish[name] = event.target.value;
    setFish(newFish);
  };

  function createFish(event) {
    event.preventDefault();
    fish.image = '/images/fish.jpg'; // no time to do base 64 convert

    const data = new URLSearchParams();
    data.append('name', fish.name);
    data.append('price', fish.price);
    data.append('status', fish.status);
    data.append('desc', fish.desc);
    data.append('image', fish.image);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    };

    fetch('http://localhost:3000/fish', requestOptions)
      .then(response => response.json())
      .then(responseData => {
        if (responseData) {
          setFish({
            name: '',
            price: 0,
            status: 'available',
            desc: '',
            image: ''
          });
        }
      })
      .catch(error => console.warn(error));
  }

  return (
    <form className='fish-add my-5' onSubmit={createFish}>
      <input name='name' value={fish.name} onChange={onChange('name')} type='text' placeholder='Name' />
      <input name='price' value={fish.price} onChange={onChange('price')} type='number' placeholder='Price' min='0' />
      <select name='status' value={fish.status} onChange={onChange('status')}>
        <option value='available'>available</option>
        <option value='unavailable'>unavailable</option>
      </select>
      <textarea name='desc' value={fish.desc} onChange={onChange('desc')} placeholder='Desc' />
      <input name='image' value={fish.image} onChange={onChange('image')} type='text' placeholder='Image' />
      <button type='submit'>+ Add Fish</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func
};

export default AddFishForm;
