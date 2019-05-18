//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { appTheme } from '../themes/themes';

const styles = () => ({
	outer: {
		position: 'relative',
		marginTop: `calc(2 * ${appTheme.topNavLineHeight}px - 1px)`,
		zIndex: '-100',
		width: '100%',
		margin: '0 auto',
		lineHeight: '1.5em'
	}
});

const Outer = ({ classes, children }) => <main className={classes.outer}>{children}</main>;

Outer.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withStyles(styles)(Outer);
