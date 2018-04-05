
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';

const Example3 = (props) => {
	const { browser } = props;
	return (
		<div>
			<div>Example 3 Test</div>
			<p>
			The viewport current media type is: {browser.mediaType}
			</p>
			<div>End of Example 3 Test</div>
		</div>
	);
};

Example3.propTypes = {
	browser: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
	browser: state.browserReducer,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Example3);
