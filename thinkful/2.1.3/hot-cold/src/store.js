
import { createStore } from 'redux';

import * as reducers from './reducers/index';

// import { repositoryReducer } from './reducers/index';

export default createStore(reducers.repositoryReducer);
