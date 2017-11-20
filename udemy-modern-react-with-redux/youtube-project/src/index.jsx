
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = process.env.API_KEY;
console.log("(2) API_KEY "+API_KEY);

const App = () => (
	<div>
		<SearchBar />
	</div>
);

ReactDOM.render(<App />, document.querySelector('.container'));
