
import * as actions from '../actions/index';

const initialRepositoryState = { guessed: [] };

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const repositoryReducer = (state = initialRepositoryState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    return Object.assign({}, state, { guessed: [action.guess, ...state.guessed] });
  }

  if (action.type === actions.RANDOM_NUMBER) {
    return Object.assign({}, state, { random: randomInteger(action.fromNumber, action.toNumber) });
  }

  return state;
};

export default repositoryReducer;
