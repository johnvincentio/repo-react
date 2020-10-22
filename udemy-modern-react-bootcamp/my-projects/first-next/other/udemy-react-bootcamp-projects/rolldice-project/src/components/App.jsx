//

import React from 'react';

import Die from './Die';

import random from '../utilities/utils';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			die1: 0,
			die2: 0,
			rolling: false
		};
	}

	rolldice = () => {
		this.setState({ rolling: true });
		setTimeout(this.rolling, 2000);
	}

	rolling = () => {
		this.setState({ rolling: false });
		this.setState({ die1: random(), die2: random() });
	}

	render() {
		// console.log('App::render(); this.state ', this.state);
		const { rolling } = this.state;

		const buttonText = rolling ? "Rolling..." : "Roll Dice!";

		return (
			<>
				<div className="app--die">
					<Die value={this.state.die1} animate={rolling} />
					<Die value={this.state.die2} animate={rolling} />
				</div>
				<div>
					<button
						type="button"
						className="app--button"
						onClick={this.rolldice}
						disabled={rolling}
					>
						{buttonText} 
					</button>
				</div>
			</>
		);
	}
}

export default App;
