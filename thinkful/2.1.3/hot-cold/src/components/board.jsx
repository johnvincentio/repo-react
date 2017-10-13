
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';

// eslint-disable-next-line import/no-named-as-default
import GuessForm from './guess-form';
import GuessList from './guess-list';

function Board(props) {
  const form = props.completed ? '' : <GuessForm />;
  return (
    <section className="board">
      <div><h1>Hot or Cold</h1></div>
      <div className="comment">{props.comment}</div>
      {form}
      <div className="guess">Guess #<span>{props.guess}</span></div>
      <GuessList />
      <div className="random">Random #{props.random}</div>
    </section>
  );
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
