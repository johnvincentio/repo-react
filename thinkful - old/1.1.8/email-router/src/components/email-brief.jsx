
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function EmailBrief(props) {
  return (
    <div>
      <strong>
        <Link to={`${props.type}/${props.id}`} >
          {props.from}
        </Link>
      </strong>
      <div>
        {props.title}
      </div>
    </div>
  );
}

EmailBrief.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EmailBrief;
