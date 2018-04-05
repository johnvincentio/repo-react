
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from '../Icon';
import CloseIcon from './CloseIcon';

import * as actions from '../../actions/menu.actions';

export class SidePanel extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> SidePanel; constructor');
		console.log(props);
		console.log('<<< SidePanel; constructor');
		this.state = { width: 0, height: 0 };
		console.log(this.state);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.handleClickMenu = this.handleClickMenu.bind(this);
		console.log(this.props.height);
	}

	componentWillMount() {
		console.log('componentWillMount');
		this.updateDimensions();
	}
	componentDidMount() {
		console.log('componentDidMount');
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		console.log('>>> updateDimensions');
		console.log(this.state);
		const w = window;
		const d = document;
		const { documentElement } = d;
		const body = d.getElementsByTagName('body')[0];
		const w1 = w.innerWidth || documentElement.clientWidth || body.clientWidth;
		const h1 = w.innerHeight || documentElement.clientHeight || body.clientHeight;
		this.setState({ width: w1, height: h1 });
		console.log('<<< updateDimensions');
	}

	adjust() {
		console.log('>>> adjust');
		console.log(this.state);
//		const flex_direction = $('.page-container').css('flex-direction');
//		console.log("flex_direction "+flex_direction);

		console.log('<<< adjust\n');
	}

	handleClickMenu(event) {
		event.preventDefault();
		this.props.actions.CloseSidebar();
	}

	render() {
		const status = (this.props.open ? 'visible' : 'invisible');
		return (
			<nav style={{ height: '100%' }} className={`nav-sidebar ${status}`}>
				<span>{this.state.width} x {this.state.height}</span>
				{/* <div className="js--nav-inner nav-inner" role="menu" /> */}
				<div className="js--nav-inner nav-inner" role="menu">

					<h2>Settings
						<Icon name="settings" css="js--settings settings-icon" />
					</h2>
					<CloseIcon cssIcon="close-menu" cssButton="nav-menu-close" onClick={this.handleClickMenu} />

					<h2>Tasks</h2>

					<Icon name="goal" css="js--settings settings-icon" />
					<Icon name="folder" css="js--settings settings-icon" />

					<div>
						<button className="js--search-item">Search</button>
					</div>
					<div className="js--search-box jv-search-collapsed">
						<input className="search-field js--search-field" type="search" placeholder="" />
						<button className="js--search-btn search-icon">
							<Icon name="search" css="search-icon" />
						</button>
					</div>

					<h2>Articles</h2>

					<div>
						<button className="capitalize active js--select-article" data-nav-item-article-type="unread">unread
							<span className="article-count">(731)</span>
						</button>
					</div>

					<div>
						<button className="capitalize js--select-article" data-nav-item-article-type="saved">saved
							<span className="article-count">(17)</span>
						</button>
					</div>


					<h2>Subscriptions
					</h2>

					<div id="js--id-0">
						<button className="subscription-title truncate js--select-subscription" data-nav-item-url="http://rss.cnn.com/rss/edition.rss">
					CNN.com International
						</button>
					</div>

					<div id="js--id-1">
						<button className="subscription-title truncate js--select-subscription" data-nav-item-url="http://feeds.reuters.com/Reuters/worldNews">
					Reuters World News
						</button>
					</div>

				</div>
			</nav>
		);
	}
}

SidePanel.propTypes = {
	height: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	actions: PropTypes.shape({
		CloseSidebar: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	open: state.menuReducer.open,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

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
