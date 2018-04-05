import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

export class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.handleNewGame = this.props.onNewGame.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
	}

	handleHelp(event) {
		event.preventDefault();
		this.props.actions.handleHelp();
	}

	render() {
		return (
			<header>
				<nav>
					<button type="button" onClick={this.handleHelp}>
						Help
					</button>
					<button type="button" onClick={this.handleNewGame}>
						New Game
					</button>
				</nav>
			</header>
		);
	}
}

Navigation.propTypes = {
	onNewGame: PropTypes.func.isRequired,
	actions: PropTypes.shape({
		handleHelp: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Navigation);
