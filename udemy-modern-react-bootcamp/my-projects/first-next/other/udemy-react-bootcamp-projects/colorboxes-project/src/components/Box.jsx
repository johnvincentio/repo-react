//

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import React from 'react';
import PropTypes from 'prop-types';

class Box extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};
	}

	toggleHover = () => {
		this.setState(prevState => ({ hover: !prevState.hover }));
	}

	handleChangeColor = () => {
		this.props.changeColor(this.props.id);
	}

	render() {
		// console.log('Box::render(); this.props ', this.props);
		const { color } = this.props;
		const { hover } = this.state;

		const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
		const style = hover ? { color: `black`, backgroundColor: `white` } : { color: `white`, backgroundColor: rgb }
		return (
			<div
				style={{ backgroundColor: rgb }}
				className="box"
				onClick={this.handleChangeColor}
				role="button"
				onMouseEnter={this.toggleHover}
				onMouseLeave={this.toggleHover}
			>
				<div
					style={style}
					className="box--text"
				>
					{hover && rgb}
				</div>
			</div>
		);
	}
}

Box.propTypes = {
	id: PropTypes.number.isRequired,
	color: PropTypes.shape({
		r: PropTypes.number.isRequired,
		g: PropTypes.number.isRequired,
		b: PropTypes.number.isRequired
	}).isRequired,
	changeColor: PropTypes.func.isRequired
}

export default Box;
