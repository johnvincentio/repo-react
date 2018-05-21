//

import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from './RegisterStyles';

class UserRegister extends React.Component {
	componentDidMount() {
		const { userid, otherid } = this.props;
		this.props.actions
			.verifyRegisterUser({
				registerId: userid,
				otherId: otherid
			})
			.then(() => {
				this.props.history.push('/user/registered/success');
			})
			.catch(() => {
				this.props.history.push('/user/registered/failed');
			});
	}

	render() {
		return (
			<Outer>
				<Inner>
					<Title>Registration Check</Title>

					<Nav>
						<p>We are checking your registration...</p>
					</Nav>
				</Inner>
			</Outer>
		);
	}
}

UserRegister.propTypes = {
	userid: PropTypes.string.isRequired,
	otherid: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		verifyRegisterUser: PropTypes.func.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(UserRegister));
