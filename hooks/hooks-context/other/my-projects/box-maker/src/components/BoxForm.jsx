// 

import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

class BoxForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initState();
	}

	initState = () => ({ width: `100`, height: `100`, color: `blue` });

	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.add( { ...this.state, id: uuidv4() });
		this.setState(this.initState());
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="height">
							Height
							<input onChange={this.handleChange} value={this.state.height} id="height" name="height" type="text" />
						</label>
					</div>
					<div>
						<label htmlFor="width">
							Width
							<input onChange={this.handleChange} value={this.state.width} id="width" name="width" type="text" />
						</label>
					</div>
					<div>
						<label htmlFor="color">
							Color
							<input onChange={this.handleChange} value={this.state.color} id="color" name="color" type="text" />
						</label>
					</div>
					<button type="submit">Add Box</button>
				</form>
			</div>
		);
	}
}

BoxForm.propTypes = {
	add: PropTypes.func.isRequired
}

export default BoxForm;
