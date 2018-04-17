import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- Select::constructor(), props ', props);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	onSelectChange(event) {
		// console.log('Select, event.target.value ', event.target.value);
		this.props.onSelectChange(event.target.value);
	}

	renderOptions() {
		return this.props.options.map(opt => (
			<option key={opt.id} value={opt.id}>
				{opt.title}
			</option>
		));
	}

	render() {
		// console.log('--- Select::render(), props ', this.props);
		const { className } = this.props;
		return (
			<div className={className}>
				<select
					name={this.props.name}
					defaultValue={this.props.selectedOption}
					onChange={this.onSelectChange}
				>
					{this.renderOptions()}
				</select>
			</div>
		);
	}
}

Select.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	selectedOption: PropTypes.number.isRequired,

	onSelectChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		// eslint-disable-line function-paren-newline
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired
};

Select.defaultProps = {
	className: ''
};
