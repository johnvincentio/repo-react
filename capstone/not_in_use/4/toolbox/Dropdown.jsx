
import React from 'react';
import PropTypes from 'prop-types';

export default class Dropdown extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- Dropdown::constructor(), props ', props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		// console.log('Dropdown, event.target.value ', event.target.value);
		this.props.submit(event.target.value);
	}

	renderOptions() {
		return this.props.options.map(opt => (
			<option
				key={opt.id}
				value={opt.id}
			>
				{opt.title}
			</option>
		));
	}

	render() {
		// console.log('--- Dropdown::render(), props ', this.props);
		const { className } = this.props;
		return (
			<div className={className}>
				<select
					name={this.props.name}
					defaultValue={this.props.selectedOption}
					onChange={this.onInputChange}
				>
					{this.renderOptions()}
				</select>
			</div>
		);
	}
}

Dropdown.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	selectedOption: PropTypes.number.isRequired,
	submit: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(	// eslint-disable-line function-paren-newline
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
		}).isRequired).isRequired,
};

Dropdown.defaultProps = {
	className: '',
};
