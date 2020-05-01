//

import React from 'react';
import PropTypes from 'prop-types';

class Box extends React.Component {

	handleClick = () => {
		this.props.remove(this.props.box.id);
	}

	render() {
		const { width, height, color } = this.props.box;
		const style = { width: `${width}px`, height: `${height}px`, backgroundColor: `${color}` };
		return (
			<div className="box" style={style} onClick={this.handleClick} />
		);
	}
}

Box.propTypes = {
	box: PropTypes.shape({
		width: PropTypes.string.isRequired,
		height: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired,
	remove: PropTypes.func.isRequired
}

export default Box;
