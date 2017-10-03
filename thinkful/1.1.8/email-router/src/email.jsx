
import React from 'react';
import PropTypes from 'prop-types';

function Email(props) {
  // console.log('--- Email');
  return (
    <div>
      <h1>Single Email</h1>
      <div>{props.id}</div>
      <div>{props.from}</div>
      <div>{props.to}</div>
      <div>{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
}

Email.propTypes = {
  id: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Email;
