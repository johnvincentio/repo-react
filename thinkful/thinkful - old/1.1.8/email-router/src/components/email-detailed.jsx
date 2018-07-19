
import React from 'react';
import PropTypes from 'prop-types';

function EmailDetailed(props) {
  return (
    <div>
      <h1>{props.type}</h1>
      <div>Id: {props.id}</div>
      <div>From: {props.from}</div>
      <div>To: {props.to}</div>
      <div>Title: {props.title}</div>
      <div>Content: {props.content}</div>
    </div>
  );
}

EmailDetailed.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default EmailDetailed;
