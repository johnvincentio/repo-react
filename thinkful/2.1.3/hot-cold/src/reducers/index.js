
import * as actions from '../actions/index';

import Utils from '../utils';

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialState = {
  guessed: [],
  comment: 'Make your Guess!',
  random: randomInteger(1, 100),
  completed: false,
  help: false,
};

export const repositoryReducer = (state = initialState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    const comment = Utils.handleComment(state.random, action.guess);
    const completed = state.random === action.guess;
    if (action.guess > 0 && action.guess < 101) {
      return Object.assign(
        {}, state,
        { guessed: [...state.guessed, action.guess], comment, completed },
      );
    }
    return Object.assign(
      {}, state,
      { guessed: state.guessed, comment, completed },
    );
  }

  if (action.type === actions.NEW_GAME) {
    return Object.assign(
      {}, state,
      {
        guessed: [], comment: 'Make your Guess!', random: randomInteger(1, 100), completed: false,
      },
    );
  }

  if (action.type === actions.HELP) {
    console.log('action.type === actions.HELP');
    return Object.assign(
      {}, state,
      {
        help: true,
      },
    );
  }

  if (action.type === actions.DISMISS_HELP) {
    console.log('action.type === actions.DISMISS_HELP');
    return Object.assign(
      {}, state,
      {
        help: false,
      },
    );
  }

  return state;
};

export default repositoryReducer;
