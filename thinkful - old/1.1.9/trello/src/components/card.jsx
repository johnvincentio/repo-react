
import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  return (
    <div>{props.text}</div>
  );
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Card;
