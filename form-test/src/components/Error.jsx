//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	error: {
		color: theme.palette.error.main,
		textAlign: 'center'
	}
});

const Error = props => <div className={props.classes.error}>{props.text}</div>;

Error.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	text: PropTypes.string
};

Error.defaultProps = {
	text: null
};

export default withStyles(styles, { withTheme: true })(Error);
