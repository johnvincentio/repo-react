import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

const Nav = () => (
	<ul className="navigation">
		<li><a href="/">Home</a></li>
		<li><a href="/">About</a></li>
		<li><a href="/">Products</a></li>
		<li><a href="/">Contact</a></li>
	</ul>
);

export class Try4 extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		const { browser } = this.props;
		const { mobile } = browser.is;
		const flow = mobile ? 'flex-column' : 'row';
		return (
			<div className="fullHeight flex-column">
				<header className={flow}>
					<div>Header</div>
					<Nav />
				</header>
				<div id="main">
					<article>Article</article>
					<nav>Nav</nav>
					<aside>Aside</aside>
				</div>
				<footer>Footer</footer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedin: state.headerReducer.loggedin,
	browser: state.browserReducer,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Try4);

/*
		return (
			<div className="fullHeight page">
				<header className="row">
					<div>Header</div>
					{!mobile && <Nav />}
				</header>
				{mobile && <Nav />}
				<div id="main">
					<article>Article</article>
					<nav>Nav</nav>
					<aside>Aside</aside>
				</div>
				<footer>Footer</footer>
			</div>
		);
*/
