
import * as actions from '../actions/index';

const initialRepositoryState = [{ guessed: [] }];

// eslint-disable-next-line no-mixed-operators
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const repositoryReducer = (state = initialRepositoryState, action) => {
  if (action.type === actions.USER_GUESSED_NUMBER) {
    console.log(state);
    console.log(state[0]);
    console.log(state[0].guessed);
    state[0].guessed.push(action.guess);
    return state;
  }

  if (action.type === actions.RANDOM_NUMBER) {
    return [...state, {
      random: randomInteger(action.fromNumber, action.toNumber),
    }];
  }

  return state;
};

export default repositoryReducer;
