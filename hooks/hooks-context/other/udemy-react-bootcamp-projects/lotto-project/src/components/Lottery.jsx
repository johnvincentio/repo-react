//

/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

class Lottery extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			balls: this.generateBalls()
		};
	}

	generateBalls = () => {
		return  [ ...Array(this.props.numBalls).keys() ]
			.map(() => Math.floor(Math.random() * this.props.maxNum));
	}

	generate = () => {
		this.setState({ balls: this.generateBalls() });
	}

	render() {
		// console.log('App::render(); this.state ', this.state, ' this.props ', this.props);
		const { title } = this.props;
		// console.log('balls ', this.state.balls);
		return (
			<div className="lottery">
				<div className="lottery--title">{title}</div>
				<div className="lottery--balls">
					{this.state.balls.map((ball, id) => <div key={id} className="lottery--ball">{ball}</div>)}
				</div>
				<div>
					<button type="button" className="lottery--button" onClick={this.generate}>
					Generate
					</button>
				</div>
				
			</div>
		);
	}
}

Lottery.propTypes = {
	title: PropTypes.string,
	numBalls: PropTypes.number,
	maxNum: PropTypes.number
};

Lottery.defaultProps = {
	title: "Lotto",
	numBalls: 6,
	maxNum: 99
}

export default Lottery;