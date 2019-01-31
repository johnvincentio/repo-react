//

import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import DevTools from '../root/DevTools';

const configureStore = (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = compose(
		// responsiveStoreEnhancer,
		applyMiddleware(...middleware),
		DevTools.instrument(),
		persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
	);
	const store = createStore(rootReducer, initialState, enhancers);
	return store;
};

export default configureStore;
