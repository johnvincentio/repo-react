//

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		};

		componentWillMount() {
			if (!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.context.router.push('/');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	Authentication.propTypes = {
		classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
		authenticated: PropTypes.bool.isRequired
	};

	function mapStateToProps(state) {
		console.log('mapStateToProps; state ', state);
		return { authenticated: state.user.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}
