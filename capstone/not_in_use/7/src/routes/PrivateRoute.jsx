//

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ authenticated, path, render, location }) => {
	// console.log('PrivateRoute, path ', path, ' authenticated ', authenticated, ' location ', location);
	if (authenticated) {
		return <Route path={path} render={render} />;
	}
	return <Route path={path} render={() => <Redirect to={{ pathname: '/signin', state: { from: location } }} />} />;
};

PrivateRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	render: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	// console.log('mapStateToProps; state ', state);
	return {
		authenticated: state.user.authenticated
	};
}

export default connect(mapStateToProps)(PrivateRoute);

/*
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('user') ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			)
		}
	/>
);
*/
