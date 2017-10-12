
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
    return Object.assign(
      {}, state,
      { guessed: [action.guess, ...state.guessed], comment, completed },
    );
  }

  if (action.type === actions.NEW_GAME) {
    //    const jv = Object.assign({}, initialRepositoryState);
    //    jv.random = randomInteger(1, 100);
    //    return jv;
    // const jv1 = Object.assign({}, ...initialState, { random: randomInteger(1, 100) });
    // const jv1 = Object.assign({}, { guessed: [], comment: 'Make your Guess!', random: randomInteger(1, 100) });
    // console.log(jv1);
    return Object.assign(
      {}, state,
      { guessed: [], comment: 'Make your Guess!', random: randomInteger(1, 100), completed: false },
    );
  }

  return state;
};

export default repositoryReducer;
