
import * as actions from '../actions/index';

const initialRepositoryState = {
  guessed: [46, 62],
  comment: 'Make your Guess!',
};

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const repositoryReducer = (state = initialRepositoryState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    return Object.assign({}, state, { guessed: [action.guess, ...state.guessed] });
  }

  if (action.type === actions.NEW_GAME) {
    return Object.assign({}, initialRepositoryState, { random: randomInteger(action.fromNumber, action.toNumber) });
  }

  return state;
};

export default repositoryReducer;
