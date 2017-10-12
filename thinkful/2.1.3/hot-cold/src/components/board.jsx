
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

// eslint-disable-next-line import/no-named-as-default
import GuessForm from './guess-form';
import GuessList from './guess-list';

// eslint-disable-next-line react/prefer-stateless-function
export class Board extends React.Component {
// eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // console.log('>>> Board');
    // console.log(props);
    // props.actions.handleNewGame();
    // console.log('Board; after handleNewGame');
    // console.log(props);
    // console.log('<<< Board');
  }

  render() {
    const form = this.props.completed ? '' : <GuessForm />;
    return (
      <div className="inner">
        <div>app comment {this.props.comment}</div>
        {form}
        {/* <GuessForm /> */}
        <GuessList />
        <div>Guess #{this.props.guess}!</div>
        <div>Random #{this.props.random}</div>
      </div>
    );
  }
}

Board.propTypes = {
  comment: PropTypes.string.isRequired,
  guess: PropTypes.number.isRequired,
  random: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  comment: state.comment,
  guess: state.guessed.length,
  random: state.random,
  completed: state.completed,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
