
import React from 'react';
import PropTypes from 'prop-types';

class Mailbox extends React.Component {
  constructor(props) {
    super(props);
    console.log('--- Mailbox');
    // const a = props.match;
    // const b = props.match.params;
    // const c = props.match.params.mailbox_name;
    this.state = { type: props.match.params.mailbox_name };
  }

  render() {
    return (
      <div>
        <h2>Mailbox header - {this.state.type}</h2>
        <ul>
          <li>sbc</li>
          <li>def</li>
          <li>gret</li>
        </ul>
      </div>
    );
  }
}

Mailbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      mailbox_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Mailbox;
