
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ButtonIcon from '../toolbox/ButtonIcon';

import * as actions from '../actions/';

class OpenMenu extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- OpenMenu; constructor, props ', props);
		this.handleClickMenu = this.handleClickMenu.bind(this);
	}
	handleClickMenu(event) {
		event.preventDefault();
		this.props.actions.OpenSidebar();
	}

	render() {
		return (
			<div>
				{!this.props.open &&
					<ButtonIcon
						svgName="hamburger"
						cssIcon="open-menu"
						cssButton="sidebar-menu-open"
						onClick={this.handleClickMenu}
					/>
				}
			</div>
		);
	}
}

OpenMenu.propTypes = {
	open: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		OpenSidebar: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	open: state.menuReducer.open,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenMenu);
