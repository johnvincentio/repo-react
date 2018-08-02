//

import React from 'react';

// Connect this component
export default function InterestCalculator(props) {
	return (
		<form className="interest-calculator" onSubmit={e => e.preventDefault()}>
			<div className="form-group">
				<label htmlFor="principal">Principal ($)</label>
				<input type="number" id="principal" value={props.principal} min="0" />
			</div>
			<div className="form-group">
				<label htmlFor="interest">Interest rate (%)</label>
				<input type="number" id="interest" value={props.interest} min="0" max="100" step="0.1" />
			</div>
			<div className="form-group">
				<label htmlFor="years">Years</label>
				<input type="number" id="years" value={props.years} min="0" max="100" />
			</div>
			<div className="form-group">
				<label htmlFor="total">Total</label>
				<output type="number" id="total">
					${props.total.toFixed(2)}
				</output>
			</div>
		</form>
	);
}

InterestCalculator.defaultProps = {
	principal: 0,
	interest: 0,
	years: 0,
	total: 0
};
