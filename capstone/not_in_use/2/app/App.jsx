// App.jsx

import React, { Fragment } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

import Header from '../header/Header';

import ArticleRoutes from './ArticleRoutes';
import SidebarRoutes from './SidebarRoutes';

import Footer from '../Footer';

import { isDesktop } from '../../utilities/utils';

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- App::constructor, props ', props);
		if (isDesktop()) {
			this.props.actions.CloseSidebar();
		}
	}

	componentDidMount() {
		console.log('>>> App; componentDidMount');
		this.props.actions.getUserData();
		console.log('<<< App; componentDidMount');
	}

	render() {
		const sidebarOpen = this.props.open;
		const sidebar = sidebarOpen ? 'app-grid--sidebar-open' : 'app-grid--sidebar-closed';
		return (
			<Router>
				<Fragment>
					<Header />
					<ArticleRoutes />
					<SidebarRoutes />
					<Footer />
				</Fragment>
			</Router>
		);
	}
}

App.propTypes = {
	// goals: goalsType.isRequired,	// eslint-disable-line react/no-typos
	open: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		getUserData: PropTypes.func.isRequired,
		CloseSidebar: PropTypes.func.isRequired
	}).isRequired

	// dispatch: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	// browser: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	open: state.menuReducer.open,
	loggedin: state.headerReducer.loggedin
	// goals: state.dataReducer.goals,
	// browser: state.browserReducer,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
return (
	<div className="app-grid app-grid--sidebar-closed">
		<div className="app-grid--header"><Header /></div>
		<article className="app-grid-article content">
			<Route exact path="/" component={Content} />
			<Route path="/settings/goals" component={ConfigureGoals} />
			<Route path="/settings/projects" component={ConfigureProjects} />
		</article>
{/ * <div className="app-grid--ads">Ads</div> * /}
		<div className="app-grid--footer"><Footer /></div>
		</div>
	);
*/

/*
	render() {
		const sidebarOpen = this.props.open;
		// const { mobile } = this.props.browser.is;
		if (sidebarOpen) {
			return (
				<div className="app-grid app-grid--sidebar-open">
					<div className="app-grid--header"><Header /></div>
					<article className="app-grid--article content">
						<ArticleRoutes />
					</article>
					<div className="app-grid--sidebar sidebar">
						<SidebarRoutes />
					</div>
					<div className="app-grid--footer"><Footer /></div>
				</div>
			);
		}
		return (
			<div className="app-grid app-grid--sidebar-closed">
				<div className="app-grid--header"><Header /></div>
				<article className="app-grid--article content">
					<ArticleRoutes />
				</article>
				<div className="app-grid--footer"><Footer /></div>
			</div>
		);
	}
	*/
