import React from 'react';
import PropTypes from 'prop-types';

import * as utilsUtilities from '../utilities/utils';

export default class TextArea extends React.Component {
	constructor(props) {
		// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- TextArea::constructor(), props ', props);
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
		// console.log('--- TextArea::render()');
		const extraProps = utilsUtilities.remainingProperties(this.props, TextArea.propTypes);
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<label htmlFor={this.props.id}>
						{this.props.title}
						<textarea
							id={this.props.id}
							style={this.props.resize ? null : { resize: 'none' }}
							name={this.props.name}
							rows={this.props.rows}
							value={this.state.term}
							onChange={this.onInputChange}
							placeholder={this.props.placeholder}
							onClick={this.onClick}
							{...extraProps}
						/>
					</label>
					{this.state.buttonsOpen && (
						<div>
							<button type="submit">Submit</button>
							<button onClick={this.onCancel}>Cancel</button>
						</div>
					)}
				</form>
			</div>
		);
	}
}

TextArea.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	submit: PropTypes.func.isRequired
};

TextArea.defaultProps = {
	title: '',
	content: '',
	resize: true,
	placeholder: ''
};
