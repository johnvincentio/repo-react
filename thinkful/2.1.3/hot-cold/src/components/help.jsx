
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

export class Help extends React.Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss(event) {
    event.preventDefault();
    this.props.actions.handleDismissHelp();
  }

  render() {
    console.log(this.props);
    const display = this.props.help ? 'display' : 'hide';
    const classes = `overlay ${display}`;
    console.log('classes '+classes);
    return (
      <div className={classes} >
        <div className="content">
          <h3>What do I do?</h3>
          <div>
            <p>This is a Hot or Cold Number Guessing Game. The game goes like this: </p>
            <ul>
              <li>1. I pick a <strong>random secret number</strong> between 1 to 100 and keep it hidden.</li>
              <li>2. You need to <strong>guess</strong> until you can find the hidden secret number.</li>
              <li>3. You will <strong>get feedback</strong> on how close (&quot;hot&quot;) or far (&quot;cold&quot;) your guess is.</li>
            </ul>
            <p>So, Are you ready?</p>
            <button type="button" onClick={this.dismiss}>Got It!</button>
          </div>
        </div>
      </div>
    );
  }
}

Help.propTypes = {
  actions: PropTypes.shape({
    handleDismissHelp: PropTypes.func,
  }).isRequired,
  help: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  help: state.help,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Help);
