
// import React from 'react';
// import ReactDOM from 'react-dom';

import * as actions from './actions/index';
import * as reducers from './reducers/index';

const add1 = actions.addRepository('jv1');
console.log('>>> add1');
console.log(add1);
console.log('<<< add1');

const rate1 = actions.rateRepository('jv1', 5);
console.log('>>> rate1');
console.log(rate1);
console.log('<<< rate1');

const add2 = actions.addRepository('jv2');
console.log('>>> add2');
console.log(add2);
console.log('<<< add2');

let state = [];
state = reducers.repositoryReducer(state, add1);
console.log('>>> state');
console.log(state);
console.log('<<< state');

state = reducers.repositoryReducer(state, add2);
console.log('>>> state');
console.log(state);
console.log('<<< state');

state = reducers.repositoryReducer(state, rate1);
console.log('>>> state');
console.log(state);
console.log('<<< state');


// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<PersonList />, document.getElementById('root'));
// });
