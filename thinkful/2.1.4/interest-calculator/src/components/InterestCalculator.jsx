//

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

export class InterestCalculator extends React.Component {
	changePrincipal = principal => {
		this.props.actions.setPrincipal(principal * 1);
	};
	changeInterest = interest => {
		this.props.actions.setInterest(interest * 1);
	};
	changeYears = years => {
		this.props.actions.setYears(years * 1);
	};

	render() {
		const { principal, interest, years } = this.props;
		// console.log('render(); this.state ', this.state, ' this.props ', this.props);
		return (
			<form className="interest-calculator" onSubmit={e => e.preventDefault()}>
				<div className="form-group">
					<label htmlFor="principal">
						Principal ($)
						<input
							type="number"
							id="principal"
							value={principal}
							min="0"
							onChange={e => this.changePrincipal(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="interest">
						Interest rate (%)
						<input
							type="number"
							id="interest"
							value={interest}
							min="0"
							max="100"
							step="0.1"
							onChange={e => this.changeInterest(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="years">
						Years
						<input
							type="number"
							id="years"
							value={years}
							min="0"
							max="100"
							onChange={e => this.changeYears(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-group">
					<label htmlFor="total">
						Total
						<output type="number" id="total">
							${this.props.total.toFixed(2)}
						</output>
					</label>
				</div>
			</form>
		);
	}
}

InterestCalculator.propTypes = {
	principal: PropTypes.number,
	interest: PropTypes.number,
	years: PropTypes.number,
	total: PropTypes.number,
	actions: PropTypes.shape({
		setPrincipal: PropTypes.func.isRequired,
		setInterest: PropTypes.func.isRequired,
		setYears: PropTypes.func.isRequired
	}).isRequired
};

InterestCalculator.defaultProps = {
	principal: 0,
	interest: 0,
	years: 0,
	total: 0
};

const mapStateToProps = state => ({
	principal: state.principal,
	interest: state.interest,
	years: state.years,
	total: state.principal * Math.pow(1 + state.interest / 100, state.years)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InterestCalculator);
