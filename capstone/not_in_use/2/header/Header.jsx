import React from 'react';
// import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppBar, Toolbar, Typography, LeftNav, MenuItem } from 'material-ui';

import * as actions from '../../actions';

import ButtonAppBar from './ButtonAppBar';
import MenuAppBar from './MenuAppBar';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.handleClickMenu = this.handleClickMenu.bind(this);
	}

	handleClickMenu(event) {
		event.preventDefault();
		this.setState({ navOpen: !this.state.navOpen });
	}

	// handleSignOut() {
	// 	localStorage.clear();
	// 	browserHistory.push('/');
	// }

	render() {
		const gridClass = this.state.navOpen ? 'header-grid-open' : 'header-grid-closed';
		return <ButtonAppBar position="static" />;
	}
}

Header.propTypes = {
	loggedin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	loggedin: state.headerReducer.loggedin
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

/*
	render() {
		const gridClass = this.state.navOpen ? 'header-grid-open' : 'header-grid-closed';
		return (
			<header className={`${gridClass} header`}>
				<div
					className="header-grid--title"
					role="presentation"
					itemScope
					itemType="http://schema.org/Product"
				>
					<HeaderTitle />
				</div>

				<MediaQuery maxWidth={580}>
					<div className="header-grid--icon header-icon-parent">
						{this.state.navOpen ? (
							<ButtonIcon
								svgName="cancel"
								cssIcon="close-menu"
								cssButton="header-icon"
								onClick={this.handleClickMenu}
							/>
						) : (
							<ButtonIcon
								svgName="hamburger"
								cssIcon="open-menu"
								cssButton="header-icon"
								onClick={this.handleClickMenu}
							/>
						)}
					</div>
				</MediaQuery>

				<MediaQuery maxWidth={580}>
					{this.state.navOpen && (
						<div className="header-grid--nav">
							<HeaderNav loggedin={this.props.loggedin} />
						</div>
					)}
				</MediaQuery>

				<MediaQuery minWidth={580}>
					<div className="header-grid--nav">
						<HeaderNav loggedin={this.props.loggedin} />
					</div>
				</MediaQuery>
			</header>
		);
	}
*/

/*
<MediaQuery maxWidth={580}>
	<HeaderNav loggedin={this.props.loggedin} navOpen={this.state.navOpen} />
	<HeaderMobileIcon navOpen={this.state.navOpen} onClick={this.handleClickMenu} />
</MediaQuery>

<MediaQuery minWidth={580}>
	<HeaderNav loggedin={this.props.loggedin} />
</MediaQuery>
*/

/*
<HeaderNav loggedin={this.props.loggedin} navOpen={this.state.navOpen} />
*/
/*
{mobileOpen &&
	<div className="Grid-cell">
		{nav}
		<button className="header-nav-toggle" onClick={this.handleClickMenu}>
			<Icon name="delete" css="close-menu" />
		</button>
	</div>
}

{mobileClosed &&
	<div className="Grid-cell">
		<button className="header-nav-toggle" onClick={this.handleClickMenu}>
			<Icon name="menu-button-of-three-horizontal-lines" css="open-menu" />
		</button>
	</div>
}

{!mobile &&
	<div>
		{nav}
	</div>
}
*/
