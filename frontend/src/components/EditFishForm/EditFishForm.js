import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './EditFishForm.scss';

const EditFishForm = props => {
  const [fish, setFish] = useState(
    props.fish || {
      name: '',
      price: 0,
      status: 'available',
      desc: '',
      image: ''
    }
  );

  const handleChange = name => event => {
    let newFish = { ...fish };
    newFish[name] = event.target.value;
    setFish(newFish);
    props.updateFish(props.index, newFish);
  };

  const deleteFish = id => {
    const requestOptions = { method: 'DELETE' };

    fetch('http://localhost:3000/fish/' + id, requestOptions);
  };

  return (
    <div className='fish-edit my-4'>
      <input type='text' name='name' onChange={handleChange('name')} value={fish.name} />
      <input type='text' name='price' onChange={handleChange('price')} value={fish.price} />
      <select type='text' name='status' onChange={handleChange('status')} value={fish.status}>
        <option value='available'>available</option>
        <option value='unavailable'>unavailable</option>
      </select>
      <textarea name='desc' onChange={handleChange('desc')} value={fish.desc} />
      <input type='text' name='image' onChange={handleChange('image')} value={fish.image} />
      <button onClick={() => deleteFish(fish._id)}>Remove fish</button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }),
  index: PropTypes.string,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func
};

export default EditFishForm;
