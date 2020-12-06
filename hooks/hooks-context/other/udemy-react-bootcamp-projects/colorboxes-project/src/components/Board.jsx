//

/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boxes: this.generateBoxes()
		};
	}

	generateBoxes = () => {
		return [ ...Array(this.props.boxes).keys() ]
			.map(() => this.generateColor());
	}

	generateColor = () => {
		return {
			r: this.generateRandom(),
			g: this.generateRandom(),
			b: this.generateRandom()
		};
	}

	generateRandom = () => {
		return Math.floor(Math.random() * 256) - 1;
	}

	changeColor = (id) => {
		this.setState(prevState => {
			const newBoxes = [...prevState.boxes];
			newBoxes[id] = this.generateColor();
			return ({ boxes: newBoxes });
		});
	}

	render() {
		return (
			<div className="board">
				{this.state.boxes.map((box, id) => (
					<div key={id}>
						<Box id={id} color={box} changeColor={this.changeColor} />
					</div>))}
			</div>
		);
	}
}

Board.propTypes = {
	boxes: PropTypes.number
}

Board.defaultProps = {
	boxes: 16
}

export default Board;
