
import React from 'react';
import PropTypes from 'prop-types';

import EMAILS from './emails';
import Email from './email';

function EmailContainer(props) {
  const item = EMAILS.inbox[props.match.params.id];
  return (<Email
    id={item.id}
    from={item.from}
    to={item.to}
    title={item.title}
    content={item.content}
  />);
}

EmailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      // title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EmailContainer;
