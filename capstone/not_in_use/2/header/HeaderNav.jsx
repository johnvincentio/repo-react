
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeaderNav = (props) => {
	const { loggedin } = props;
	const navItem = loggedin ?
		<Link to="/">Sign Out</Link> : <Link to="/login">Sign In</Link>;
	return (
		<nav className="header-nav">
			<ul>
				<li><Link to="/tasks/">Tasks</Link></li>
				<li><Link to="/calendar/">Calendar</Link></li>
				<li><Link to="/goals/">Goals</Link></li>
				<li><Link to="/projects/">Projects</Link></li>
				<li><Link to="/status/">Status</Link></li>
				<li><Link to="/tags/">Tags</Link></li>
				<li>{ navItem }</li>
				<li><Link to="/test3/">Test3</Link></li>
			</ul>
		</nav>
	);
};

HeaderNav.propTypes = {
	loggedin: PropTypes.bool.isRequired,
};

// HeaderNav.defaultProps = {
// 	navOpen: true,
// };

export default HeaderNav;

/*
<li><Link to="/test2/">Test2</Link></li>
<li><Link to="/test/">Test</Link></li>

<li><a href="/">Goals</a></li>

<li className='main-nav-link'><Link to={'/'} onClick={() => this.toggleNav()}>Home</Link></li>
<li className='main-nav-link'><Link to={'/account/'} onClick={() => this.toggleNav()}>Edit Items</Link></li>
<li className='main-nav-link'><Link to={'/add-item/'} onClick={() => this.toggleNav()}>Add Item</Link></li>
*/
