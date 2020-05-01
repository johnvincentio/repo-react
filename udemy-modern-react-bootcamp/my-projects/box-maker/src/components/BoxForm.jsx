// 

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';

class BoxForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initState();
	}

	initState = () => {
		return { width: 0, height: 0, color: '' };
	}

	handleChange = ({ target: { name, value } }) => {
		console.log('handleChange; name ', name, ' value ', value)
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		console.log('handleSubmit')
		e.preventDefault();
		this.props.add(this.state);
		this.setState(this.initState())
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
