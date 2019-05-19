//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	inner: {
		maxWidth: '800px',
		textAlign: 'left',
		backgroundColor: 'white',
		color: theme.text.main,
		boxShadow: theme.boxShadow.e6
		// [theme.breakpoints.up('xs')]: {
		// 	width: '100%',
		// 	margin: 0,
		// 	padding: '5px 3px',
		// 	borderRadius: 0
		// },
		// [theme.breakpoints.up('sm')]: {
		// 	width: '90%',
		// 	margin: '40px auto',
		// 	padding: '10px',
		// 	borderRadius: '5px'
		// },
		// [theme.breakpoints.up('md')]: {
		// 	margin: '40px auto',
		// 	padding: '20px 40px',
		// 	borderRadius: '10px'
		// }
	}
});

const Inner = ({ classes, children }) => <div className={classes.inner}>{children}</div>;

Inner.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withStyles(styles)(Inner);
