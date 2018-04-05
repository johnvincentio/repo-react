import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../actions/";

/* eslint-disable import/no-named-as-default */
// import Try4 from './Try4';
// import Header from './header/Header';
// import SidePanel from './sidePanel/SidePanel';
// import RightPanel from './rightPanel/RightPanel';
// import Footer from './Footer';

const HeaderMenu = props => {
	const { layout } = props;
	console.log(`layout ${layout}`);
	const flow = layout === "mobile" ? "flex-column" : "flex-row";
	return (
		<ul className={`${flow} navigation`}>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/">About</a>
			</li>
			<li>
				<a href="/">Products</a>
			</li>
			<li>
				<a href="/">Contact</a>
			</li>
		</ul>
	);
};

HeaderMenu.propTypes = {
	layout: PropTypes.string
};

HeaderMenu.defaultProps = {
	layout: ""
};

const Sidebar = () => (
	<div>
		<p>one</p>
		<p>two</p>
		<p>three</p>
		<p>four</p>
		<p>five</p>
		<p>six</p>
		<p>seven</p>
		<p>eight</p>
		<p>nine</p>
		<p>ten</p>
		<p>eleven</p>
		<p>twelve</p>
		<p>thirteen</p>
		<p>fourteen</p>
		<p>fifteen</p>
		<p>sixteen</p>
		<p>seventeen</p>
		<p>eighteen</p>
		<p>nineteen</p>
		<p>twenty</p>
		<p>twenty-one</p>
		<p>twenty-two</p>
		<p>twenty-three</p>
		<p>twenty-four</p>
		<p>twenty-five</p>
		<p>twenty-six</p>
		<p>twenty-seven</p>
		<p>twenty-eight</p>
		<p>twenty-nine</p>
		<p>thirty</p>
	</div>
);

const Layout = () => (
	<div className="fullHeight flex-column ">
		<header className="flex-0-0-auto flex-row flex--center">
			<div className="flex-1-1-auto">Header</div>
			<HeaderMenu />
		</header>
		<div className="flex-row flex-1-1-auto main">
			<article>Article</article>
			<nav className="bottom">
				<Sidebar />
			</nav>
			<aside>Aside</aside>
		</div>
		<footer className="flex-0-0-auto">Footer</footer>
	</div>
);

const MobileLayout = () => (
	<div className="fullHeight flex-column ">
		<header className="flex-0-0-auto flex-column">
			<div>Header</div>
			<HeaderMenu layout="mobile" />
		</header>
		<div className="flex-column flex-1-1-auto main">
			<article>Article</article>
			<nav className="bottom">
				<Sidebar />
			</nav>
			<aside>Aside</aside>
		</div>
		<footer className="flex-0-0-auto">Footer</footer>
	</div>
);

export class App extends React.Component {
	constructor(props) {
		super(props);
		console.log(">>> App; constructor");
		console.log(props);
		console.log("<<< App; constructor");
		// this.state = { width: 0, height: 0 };
		// console.log(this.state);
		// this.updateDimensions = this.updateDimensions.bind(this);
		// this.resize = this.resize.bind(this);
		// this.handleNewGame = this.onNewGame.bind(this);
	}

	render() {
		// const { browser } = this.props;
		const { mobile } = this.props.browser.is;
		if (mobile) {
			return <MobileLayout />;
		}
		return <Layout />;
	}
}

App.propTypes = {
	browser: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	loggedin: state.headerReducer.loggedin,
	browser: state.browserReducer
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
		return (
			<div className="fullHeight flex-column ">
				<header className={`flex-0-0-auto ${flow} jv--flex--center`}>
					<div>Header</div>
					<HeaderMenu />
				</header>
				<div className={`${flow} main`}>
					<article>Article</article>
					<nav>Nav</nav>
					<aside>Aside</aside>
				</div>
				<footer className="flex-0-0-auto">Footer</footer>
			</div>
		);
*/

// componentWillMount() {
// 	console.log('componentWillMount');
// 	this.updateDimensions();
// }
// componentDidMount() {
// 	console.log('componentDidMount');
// 	window.addEventListener('resize', this.updateDimensions);
// 	this.resize();
// }
// componentWillUnmount() {
// 	console.log('componentWillUnmount');
// 	window.removeEventListener('resize', this.updateDimensions);
// }

// updateDimensions() {
// 	console.log('>>> updateDimensions');
// 	console.log(this.state);
// 	const w = window;
// 	const d = document;
// 	const { documentElement } = d;
// 	const body = d.getElementsByTagName('body')[0];
// 	const w1 = w.innerWidth || documentElement.clientWidth || body.clientWidth;
// 	const h1 = w.innerHeight || documentElement.clientHeight || body.clientHeight;
// 	this.setState({ width: w1, height: h1 });
// 	console.log('<<< updateDimensions');
// }

// 	resize() {
// 		console.log('>>> resize');

// 		const header = document.getElementById('header');
// 		const w1 = header.clientWidth;
// 		const h1 = header.clientHeight;

// 		const flex =  document.getElementsByClassName('page-container')[0];
// 		const flex_direction = this.getStyle(flex, 'flex-direction');
// //		$('.page-container').css('flex-direction');
// 		console.log("flex_direction "+flex_direction);

// 		debugger;

// 		console.log('<<< resize\n');
// 	}

// 	getStyle(el, prop) {
//     return window.getComputedStyle(el, null).getPropertyValue(prop);
// 	}

/*
	resize() {
		console.log(">>> resize");
		const flex_direction = $('.page-container').css('flex-direction');
		console.log("flex_direction "+flex_direction);

		$('.nav-sidebar').css('height', 'auto');
		if (flex_direction === 'row') {

//        var ab1 = $('.content-panel').height();
//        var jv1 = $(document).height();

				var content_panel_height = $('.content-panel').outerHeight();
				var header_height = $('header').outerHeight();
				var footer_height = $('footer').outerHeight();
				var window_height = $(window).height();
				console.log("content_panel_height "+content_panel_height);
				console.log("header_height "+header_height);
				console.log("footer_height "+footer_height);
				console.log("window_height "+window_height);

				var height = Math.max(content_panel_height - footer_height,
						window_height - header_height - footer_height);
				console.log("height "+height);

				$('.nav-sidebar').css('height', height);
		}
		console.log('<<< resize\n');
	}
*/
