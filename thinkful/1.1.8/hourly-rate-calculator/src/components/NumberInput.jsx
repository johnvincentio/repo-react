import React from 'react';
import PropTypes from 'prop-types';

export default function NumberInput(props) {
	return (
		<div className="form-group">
			<label htmlFor={props.id}>{props.label}</label>
			<input
				value={props.value}
				onChange={e => props.onChange(e.target.value)}
				type="number"
				id={props.id}
				min={props.min}
				max={props.max}
			/>
		</div>
	);
}

NumberInput.propTypes = {
	value: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};
