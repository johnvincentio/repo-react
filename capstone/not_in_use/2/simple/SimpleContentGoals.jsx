
import React from 'react';
import { connect } from 'react-redux';

import OpenMenu from '../OpenMenu';
import SimpleGoals from './SimpleGoals';
import { goalsType } from '../../types';

class SimpleContentGoals extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		// console.log('--- SimpleContentGoals::constructor, props ', props);
	}
	render() {
		// console.log('--- SimpleContentGoals::render, props ', this.props);
		return (
			<div>
				<section>
					<div>
						<OpenMenu />
						<SimpleGoals goals={this.props.goals} />
					</div>
				</section>
			</div>
		);
	}
}

SimpleContentGoals.propTypes = {
	goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

export default connect(mapStateToProps)(SimpleContentGoals);
