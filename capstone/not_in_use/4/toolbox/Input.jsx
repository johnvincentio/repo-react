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
<Input
	id="goal-0-title"
	name="name"
	inputType="text"
	maxLength="5"
	content={goals[0].title}
	title="title"
	placeholder="Enter goal title"
	onInputChange={this.onInputChange}
	required
/>
*/
export default class Input extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- Input::constructor(), props ', props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		// console.log('onInputChange, event.target.value ', event.target.value);
		this.props.onInputChange(event.target.value);
	}

	render() {
		// console.log('--- Input::render()');
		const extraProps = utilsUtilities.remainingProperties(this.props, Input.propTypes);
		return (
			<div>
				<label htmlFor={this.props.id}>
					{this.props.title}
					<input
						id={this.props.id}
						name={this.props.name}
						type={this.props.inputType}
						value={this.props.content}
						onChange={this.onInputChange}
						placeholder={this.props.placeholder}
						onClick={this.onClick}
						{...extraProps}
					/>
				</label>
			</div>
		);
	}
}

Input.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,

	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	placeholder: PropTypes.string,

	onInputChange: PropTypes.func.isRequired
};

Input.defaultProps = {
	title: '',
	placeholder: ''
};
