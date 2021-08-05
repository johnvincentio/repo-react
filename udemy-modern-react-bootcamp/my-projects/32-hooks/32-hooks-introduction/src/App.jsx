/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import CounterClass from './simple/classes/CounterClass';
import CounterHooks from './simple/hooks/CounterHooks';
import SimpleFormClass from './simple/classes/SimpleFormClass';
import SimpleFormHooks from './simple/hooks/SimpleFormHooks';
import SimpleFormInputHook from './simple/hooks/SimpleFormInputHook';
import Toggler from './simple/hooks/Toggler';
import Clicker from './simple/hooks/Clicker';
import SWMovies from './simple/hooks/SWMovies';
import SeasonApp from './seasons/classes/SeasonApp';
import SeasonsHooksApp from './seasons/hooks/SeasonsHooksApp';
import ResourcesApp from './resources/components/ResourcesApp';

import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="App">
				<ResourcesApp />
				{/* <SeasonApp /> */}
				{/* <SeasonsHooksApp /> */}
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
