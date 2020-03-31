import PropTypes from 'prop-types';
import React from 'react';
import './Fish.scss';

const Fish = props => {
  const { image, name, price, desc, status } = props.details;
  const isAvailable = status === 'available';

  const formatPrice = cents => {
    return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };

  const soldOut = !isAvailable ? (
    <button className='btn btn-danger' disabled={!isAvailable}>
      Sold Out
    </button>
  ) : (
    ''
  );
  return (
    <li className='my-5 bg-fish text-dark d-flex pointer'>
      <img src={image} alt={image} className='mr-5' />
      <div className='p-4'>
        <h3 className='fish-name mb-3'>
          {name}
          <span className='price ml-2'>{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {soldOut}
      </div>
    </li>
  );
};

Fish.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  })
};

export default Fish;
