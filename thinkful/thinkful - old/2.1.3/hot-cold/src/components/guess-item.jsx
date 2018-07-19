
import React from 'react';
import PropTypes from 'prop-types';

function GuessItem(props) {
  return (
    <div>{props.guess}</div>
  );
}

GuessItem.propTypes = {
  guess: PropTypes.number.isRequired,
};

export default GuessItem;
