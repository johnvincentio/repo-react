
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/';

const Article = () => (
	<div className="bottom">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam massa, ornare at turpis quis, varius pulvinar lorem. Morbi eleifend nisi eget viverra fermentum. Vivamus interdum dui quis orci placerat semper. Morbi lobortis ex sit amet risus cursus pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam luctus leo augue, non facilisis nunc aliquam sed. Aliquam erat volutpat. Nam laoreet cursus nunc, id tincidunt justo. Nullam elit magna, finibus at aliquam ut, blandit vel magna. Phasellus ullamcorper urna a leo luctus vestibulum. Duis posuere leo ac lectus auctor, convallis aliquam odio gravida.</p>
		<p>Sed porttitor turpis quis est pellentesque, in accumsan risus porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas quis elit sed felis dapibus sodales ut auctor nibh. Mauris dapibus diam in ante scelerisque ultrices. Nam tincidunt lorem vel ultricies sodales. Nullam facilisis placerat pulvinar. Nullam in arcu urna. Pellentesque tempus lorem et ligula viverra convallis. Integer id vehicula quam, sit amet dictum urna. Praesent pellentesque hendrerit risus non pharetra. In a libero finibus, hendrerit justo quis, consequat nunc. Sed iaculis efficitur nunc sagittis hendrerit. Praesent ligula augue, malesuada quis pretium semper, facilisis non quam. Phasellus ac placerat mi. Quisque ac fermentum tellus.</p>
		<p>Duis facilisis aliquet neque, nec dignissim dolor venenatis non. Donec quis consectetur nibh. Ut ut purus in metus pellentesque feugiat non ut augue. Aenean at leo vulputate, viverra ligula ut, aliquam turpis. Cras nunc dui, sollicitudin quis lorem sit amet, auctor mollis libero. Integer non magna ipsum. Etiam ullamcorper urna tortor, nec tempor tortor elementum et. Donec placerat mi nisi, id rhoncus lacus sodales sed. Nullam lorem risus, sollicitudin non lacinia a, scelerisque et mauris. Vivamus nisi enim, egestas ac ante eu, molestie vestibulum felis. Praesent vitae dui tincidunt mi malesuada pharetra. Integer vehicula leo at laoreet tempor. In vestibulum rutrum tellus, eget suscipit orci egestas et. Vestibulum tincidunt aliquam dui, ac pharetra eros commodo ut. Sed tempus eget orci a laoreet. Donec gravida imperdiet congue.</p>
		<p>Proin at iaculis velit, et finibus lorem. Aenean ac enim pretium, hendrerit nunc in, tincidunt mauris. Suspendisse congue ipsum nec libero sagittis pretium. Quisque vulputate sem est, in laoreet orci sagittis sed. Vestibulum in lectus eleifend, lacinia lectus in, maximus tortor. Mauris quis posuere arcu, nec hendrerit mauris. In pulvinar sodales rhoncus. In hac habitasse platea dictumst. Ut tempor mattis ligula sed dapibus.</p>
		<p>Sed vel condimentum elit. Donec varius ex eget vestibulum egestas. Cras sed cursus massa, eget feugiat sapien. Cras maximus lectus mi, a rhoncus libero gravida quis. Fusce luctus malesuada elementum. Integer nec lectus convallis, ullamcorper orci eu, bibendum nisl. Cras hendrerit mi fringilla ante egestas pharetra. Ut sollicitudin suscipit turpis, eleifend pharetra nisl mollis sit amet. Nulla mauris elit, venenatis luctus dictum sit amet, aliquet nec leo. Fusce sed sapien libero. In lacus dui, porttitor tempus ullamcorper ac, laoreet id massa. Nulla facilisi.</p>
		<p>Proin at iaculis velit, et finibus lorem. Aenean ac enim pretium, hendrerit nunc in, tincidunt mauris. Suspendisse congue ipsum nec libero sagittis pretium. Quisque vulputate sem est, in laoreet orci sagittis sed. Vestibulum in lectus eleifend, lacinia lectus in, maximus tortor. Mauris quis posuere arcu, nec hendrerit mauris. In pulvinar sodales rhoncus. In hac habitasse platea dictumst. Ut tempor mattis ligula sed dapibus.</p>
		<p>Sed vel condimentum elit. Donec varius ex eget vestibulum egestas. Cras sed cursus massa, eget feugiat sapien. Cras maximus lectus mi, a rhoncus libero gravida quis. Fusce luctus malesuada elementum. Integer nec lectus convallis, ullamcorper orci eu, bibendum nisl. Cras hendrerit mi fringilla ante egestas pharetra. Ut sollicitudin suscipit turpis, eleifend pharetra nisl mollis sit amet. Nulla mauris elit, venenatis luctus dictum sit amet, aliquet nec leo. Fusce sed sapien libero. In lacus dui, porttitor tempus ullamcorper ac, laoreet id massa. Nulla facilisi.</p>
		<p>Proin at iaculis velit, et finibus lorem. Aenean ac enim pretium, hendrerit nunc in, tincidunt mauris. Suspendisse congue ipsum nec libero sagittis pretium. Quisque vulputate sem est, in laoreet orci sagittis sed. Vestibulum in lectus eleifend, lacinia lectus in, maximus tortor. Mauris quis posuere arcu, nec hendrerit mauris. In pulvinar sodales rhoncus. In hac habitasse platea dictumst. Ut tempor mattis ligula sed dapibus.</p>
		<p>Sed vel condimentum elit. Donec varius ex eget vestibulum egestas. Cras sed cursus massa, eget feugiat sapien. Cras maximus lectus mi, a rhoncus libero gravida quis. Fusce luctus malesuada elementum. Integer nec lectus convallis, ullamcorper orci eu, bibendum nisl. Cras hendrerit mi fringilla ante egestas pharetra. Ut sollicitudin suscipit turpis, eleifend pharetra nisl mollis sit amet. Nulla mauris elit, venenatis luctus dictum sit amet, aliquet nec leo. Fusce sed sapien libero. In lacus dui, porttitor tempus ullamcorper ac, laoreet id massa. Nulla facilisi.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam massa, ornare at turpis quis, varius pulvinar lorem. Morbi eleifend nisi eget viverra fermentum. Vivamus interdum dui quis orci placerat semper. Morbi lobortis ex sit amet risus cursus pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam luctus leo augue, non facilisis nunc aliquam sed. Aliquam erat volutpat. Nam laoreet cursus nunc, id tincidunt justo. Nullam elit magna, finibus at aliquam ut, blandit vel magna. Phasellus ullamcorper urna a leo luctus vestibulum. Duis posuere leo ac lectus auctor, convallis aliquam odio gravida.</p>
		<p>Sed porttitor turpis quis est pellentesque, in accumsan risus porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas quis elit sed felis dapibus sodales ut auctor nibh. Mauris dapibus diam in ante scelerisque ultrices. Nam tincidunt lorem vel ultricies sodales. Nullam facilisis placerat pulvinar. Nullam in arcu urna. Pellentesque tempus lorem et ligula viverra convallis. Integer id vehicula quam, sit amet dictum urna. Praesent pellentesque hendrerit risus non pharetra. In a libero finibus, hendrerit justo quis, consequat nunc. Sed iaculis efficitur nunc sagittis hendrerit. Praesent ligula augue, malesuada quis pretium semper, facilisis non quam. Phasellus ac placerat mi. Quisque ac fermentum tellus.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam massa, ornare at turpis quis, varius pulvinar lorem. Morbi eleifend nisi eget viverra fermentum. Vivamus interdum dui quis orci placerat semper. Morbi lobortis ex sit amet risus cursus pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam luctus leo augue, non facilisis nunc aliquam sed. Aliquam erat volutpat. Nam laoreet cursus nunc, id tincidunt justo. Nullam elit magna, finibus at aliquam ut, blandit vel magna. Phasellus ullamcorper urna a leo luctus vestibulum. Duis posuere leo ac lectus auctor, convallis aliquam odio gravida.</p>
		<p>Sed porttitor turpis quis est pellentesque, in accumsan risus porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas quis elit sed felis dapibus sodales ut auctor nibh. Mauris dapibus diam in ante scelerisque ultrices. Nam tincidunt lorem vel ultricies sodales. Nullam facilisis placerat pulvinar. Nullam in arcu urna. Pellentesque tempus lorem et ligula viverra convallis. Integer id vehicula quam, sit amet dictum urna. Praesent pellentesque hendrerit risus non pharetra. In a libero finibus, hendrerit justo quis, consequat nunc. Sed iaculis efficitur nunc sagittis hendrerit. Praesent ligula augue, malesuada quis pretium semper, facilisis non quam. Phasellus ac placerat mi. Quisque ac fermentum tellus.</p>
	</div>
);

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

export class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> App; constructor');
		console.log(props);
		console.log('<<< App; constructor');
		// this.state = { width: 0, height: 0 };
		// console.log(this.state);
		// this.updateDimensions = this.updateDimensions.bind(this);
		// this.resize = this.resize.bind(this);
		// this.handleNewGame = this.onNewGame.bind(this);
	}

	render() {
		const { mobile } = this.props.browser.is;
		return (
			<div className="body">
				<header id="pageHeader">Header</header>
				<article id="mainArticle"><Article /></article>
				<nav id="mainNav"><Sidebar /></nav>
				<div id="siteAds">Ads</div>
				<footer id="pageFooter">Footer</footer>
			</div>
		);
	}
}

App.propTypes = {
	browser: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	loggedin: state.headerReducer.loggedin,
	browser: state.browserReducer,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


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

