
import * as actions from './actions/index';
import store from './store';

store.dispatch(actions.generateRandomNumber(1, 100));
console.log(store.getState());

store.dispatch(actions.userGuessedNumber(26));
console.log(store.getState());

store.dispatch(actions.userGuessedNumber(71));
console.log(store.getState());

store.dispatch(actions.userGuessedNumber(10));
console.log(store.getState());

store.dispatch(actions.userGuessedNumber(93));
console.log(store.getState());
