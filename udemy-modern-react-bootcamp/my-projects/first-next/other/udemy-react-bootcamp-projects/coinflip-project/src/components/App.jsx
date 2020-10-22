//

import React from 'react';

import Coin from './Coin';

class App extends React.Component {
	constructor(props) {
		super(props);
		const isHeads = this.generateCoin();
		if (isHeads) {
			this.state = { isHeads, heads: 1, tails: 0 };
		}
		else {
			this.state = { isHeads, heads: 0, tails: 1 };
		}
	}

	generateCoin = () => {
		console.log('App::generateCoin()');
		const heads = Math.floor(Math.random() * 2) === 0;
		console.log('heads ', heads);
		return heads;
	}

	flipCoin = () => {
		console.log('App::flipCoin()');
		const isHeads = this.generateCoin();
		console.log('isHeads ', isHeads);

		this.setState(prevState => {
			return ({ 
				isHeads,
				heads: isHeads ? prevState.heads + 1 : prevState.heads,
				tails: isHeads ? prevState.tails : prevState.tails + 1
			});
		});
	}

	render() {
		console.log('App::render(); this.state ', this.state, ' this.props ', this.props);
		const total = this.state.heads + this.state.tails
		const status = `Out of ${total} flips, there have been ${this.state.heads} heads and ${this.state.tails} tails.`;
		return (
			<div className="app">
				<div className="app--title">Let&apos;s flip a coin</div>
				<Coin heads={this.state.isHeads} />
				<div>
					<button type="button" className="app--button" onClick={this.flipCoin}>
					Flip the Coin
					</button>
				</div>
				<div className="app-status">{status}</div>
			</div>
		);
	}
}

export default App;
