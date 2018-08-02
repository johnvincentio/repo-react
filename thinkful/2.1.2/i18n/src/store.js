import { createStore } from 'redux';

import { languageReducer } from './reducers';

export default createStore(languageReducer);
