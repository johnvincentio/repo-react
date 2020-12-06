//

import React from 'react';
import PropTypes from 'prop-types';

class Keyboard extends React.Component {

	presskey = (e, letter) => {
		e.preventDefault();
		// console.log('presskey; letter ', letter);
		this.props.onKeyPressed(letter);
	}

	render() {
		const { keyboard } = this.props;
		return (
			<div className="keyboard">
				{keyboard.map(item => {
					if (item.value) return (
						<button
							key={item.id} 
							type="button"
							className="keyboard--key used"
							disabled
						>
							{item.key}
						</button>
					);
					return (
						<button
							key={item.id} 
							type="button"
							className="keyboard--key unused"
							onClick={(e) => this.presskey(e, item.key)}
						>
							{item.key}
						</button>
					)}
				)}
			</div>
		);
	}
}

Keyboard.propTypes = {
	keyboard: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			value: PropTypes.bool.isRequired
		})
	).isRequired,
	onKeyPressed: PropTypes.func.isRequired
}

export default Keyboard;
