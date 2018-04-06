import React from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { goalsType } from '../../types';

import Layout from './Layout';

import DesktopMain from './DesktopMain';
import TabletMain from './TabletMain';
import MobileMain from './MobileMain';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
// const Default = props => <Responsive {...props} minWidth={768} />;

class TopMain extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- TopMain::constructor');
	}

	render() {
		console.log('AppMain::render()');
		const { grid } = this.props;
		console.log('grid ', grid);
		return (
			<Layout datatype="main">
				<Desktop>
					{grid ? (
						<DesktopMain text="DesktopMain isGrid" goals={this.props.goals} />
					) : (
						<DesktopMain text="DesktopMain not IsGrid" goals={this.props.goals} />
					)}
				</Desktop>
				<Tablet>
					{grid ? (
						<TabletMain text="TabletMain isGrid" goals={this.props.goals} />
					) : (
						<TabletMain text="TabletMain not IsGrid" goals={this.props.goals} />
					)}
				</Tablet>
				<Mobile>
					{grid ? (
						<MobileMain text="MobileMain isGrid" goals={this.props.goals} />
					) : (
						<MobileMain text="MobileMain not IsGrid" goals={this.props.goals} />
					)}
				</Mobile>
			</Layout>
		);
	}
}

TopMain.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	grid: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
	grid: state.gridReducer.grid
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMain);
