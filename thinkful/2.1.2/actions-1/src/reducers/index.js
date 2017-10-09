import * as actions from '../actions/index';

const initialRepositoryState = [];

export const repositoryReducer = (state = initialRepositoryState, action) => {
  if (action.type === actions.ADD_REPOSITORY) {
		console.log('initialRepositoryState.length '+initialRepositoryState.length);
		console.log(state);
    return [...state, {
      name: action.repository,
      rating: null,
    }];
  } else if (action.type === actions.RATE_REPOSITORY) {
    // Find the index of the matching repository
    const index = state.findIndex(repository =>
      repository.name === action.repository);

    if (index === -1) {
      throw new Error('Could not find repository');
    }

    const before = state.slice(0, index);
    const after = state.slice(index + 1);
    const newRepository = Object.assign({}, state[index], { rating: action.rating });
    return [...before, newRepository, ...after];
  }

  return state;
};

// export default repositoryReducer;
