import React from 'react';
import PropTypes from 'prop-types';

const CheckboxOrRadioGroup = props => (
	<div>
		<label htmlFor={this.props.id}>{props.title}
			<div className="checkbox-group">
				{props.options.map((option) => {
					return (
						<label key={option} className="capitalize">
							<input
								className="form-checkbox"
								name={props.setName}
								onChange={props.controlFunc}
								value={option}
								checked={props.selectedOptions.indexOf(option) > -1}
								type={props.type}
							/> {option}
						</label>
					);
				})}
			</div>
		</label>
	</div>
);

CheckboxOrRadioGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired,
};

export default CheckboxOrRadioGroup;
