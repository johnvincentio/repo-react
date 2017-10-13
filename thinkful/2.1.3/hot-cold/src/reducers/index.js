
import * as actions from '../actions/index';

import Utils from '../utils';

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialState = {
  guessed: [46, 62],
  comment: 'Make your Guess!',
  random: randomInteger(1, 100),
  completed: false,
};

export const repositoryReducer = (state = initialState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    const comment = Utils.handleComment(state.random, action.guess);
    const completed = state.random === action.guess;
    if (action.guess > 0 && action.guess < 101) {
      return Object.assign(
        {}, state,
        { guessed: [action.guess, ...state.guessed], comment, completed },
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

  return state;
};

export default repositoryReducer;
