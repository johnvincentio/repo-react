import React from 'react';
import PropTypes from 'prop-types';

import * as utilsUtilities from '../utilities/utils';

/*
TODO;
1. build PasswordField
4. requuired, maxLength, minLength
5. ref={inputRef}
6. buttons, icons, tick and x
*/

// https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/

/*
<TextInput
	id="goal-0-title"
	name="name"
	inputType="text"
	maxLength="5"
	content={goals[0].title}
	title="title"
	placeholder="Enter goal title"
	submit={this.updateGoalTitle}
	required
/>
*/
export default class TextInput extends React.Component {
	constructor(props) {
		// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- TextInput::constructor(), props ', props);
		this.state = {
			term: this.props.content,
			buttonsOpen: false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		// console.log('onClick, event', event);
		this.setState({ buttonsOpen: true });
	}

	onInputChange(event) {
		// console.log('onInputChange, event.target.value ', event.target.value);
		this.setState({ term: event.target.value });
	}

	onFormSubmit(event) {
		// console.log('onFormSubmit');
		event.preventDefault();
		this.props.submit(this.state.term);
		this.setState({ buttonsOpen: false });
	}

	onCancel(e) {
		e.preventDefault();
		this.setState({ term: this.props.content, buttonsOpen: false });
	}

	render() {
		// console.log('--- TextInput::render()');
		const extraProps = utilsUtilities.remainingProperties(this.props, TextInput.propTypes);
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<label htmlFor={this.props.id}>
						{this.props.title}
						<input
							id={this.props.id}
							name={this.props.name}
							type={this.props.inputType}
							value={this.state.term}
							onChange={this.onInputChange}
							placeholder={this.props.placeholder}
							onClick={this.onClick}
							{...extraProps}
						/>
					</label>
					{this.state.buttonsOpen && (
						<div>
							{/* <input type="submit" value="Submit" /> */}
							<button type="submit">Submit</button>
							<button onClick={this.onCancel}>Cancel</button>
						</div>
					)}
				</form>
			</div>
		);
	}
}

TextInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string
};

TextInput.defaultProps = {
	title: '',
	placeholder: '',
	content: ''
};
