//

import React from 'react';

import Board from './Board';

const App = () => {
	return (
		<div className="app">
			<Board />
			<Board boxes={20} />
		</div>
	);
}

export default App;
