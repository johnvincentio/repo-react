//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

class Box extends React.Component {

	handleClick = () => {
		this.props.remove(this.props.box.id);
	}

	render() {
		const { width, height, color } = this.props.box;
		const style = { width: `${width}px`, height: `${height}px`, backgroundColor: `${color}` };
		console.log('style ', style)

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

/*
style  { width: "150px", height: "180px", backgroundColor: "black" }

<div key={id} style={{width: "200px", height: "150px", color: "red", backgroundColor: "green"}}>
	in box
</div>

<div key={id} style={{style}}>
	in box
</div>
*/
