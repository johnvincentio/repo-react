import React from 'react';
import PropTypes from 'prop-types';

export default function Output(props) {
	return (
		<div className="form-group">
			<label htmlFor={props.id}>{props.label}</label>
			<output id={props.id} aria-live="polite">
				${props.value}
			</output>
		</div>
	);
}

Output.propTypes = {
	value: PropTypes.number,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

Output.defaultProps = {
	value: 0
};
