/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import CounterClass from './classes/CounterClass';
import CounterHooks from './hooks/CounterHooks';
import SimpleFormClass from './classes/SimpleFormClass';
import SimpleFormHooks from './hooks/SimpleFormHooks';
import SimpleFormInputHook from './hooks/SimpleFormInputHook';
import Toggler from './hooks/Toggler';
import Clicker from './hooks/Clicker';
import SWMovies from './hooks/SWMovies';
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="App">
				<CounterClass />
				<CounterHooks />
				<Toggler />
				<SimpleFormClass />
				<SimpleFormHooks />
				<SimpleFormInputHook />
				<Clicker />
				<SWMovies />
			</div>
		);
	}
}

export default App;
