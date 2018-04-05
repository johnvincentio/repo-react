import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ButtonIcon from "../toolbox/ButtonIcon";

import * as actions from "../actions/";

import WindowDimensions from "./toys/WindowDimensions";
import Example from "./toys/Example";
import Example2 from "./toys/Example2";

class Test extends React.Component {
	constructor(props) {
		super(props);
		console.log("--- Test; constructor, props ", props);
		this.handleClickMenu = this.handleClickMenu.bind(this);
	}
	handleClickMenu(event) {
		event.preventDefault();
		this.props.actions.OpenSidebar();
	}

	render() {
		console.log("--- Test::render, props ", this.props);
		return (
			<div>
				<section>
					<div>
						{!this.props.open && (
							<ButtonIcon
								svgName="hamburger"
								cssIcon="open-menu"
								cssButton="sidebar-menu-open"
								onClick={this.handleClickMenu}
							/>
						)}

						<div>
							<WindowDimensions />
							<Example />
							<Example2 />
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Test.propTypes = {
	open: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		OpenSidebar: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	open: state.menuReducer.open
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
