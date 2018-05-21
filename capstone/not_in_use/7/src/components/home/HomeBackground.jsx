//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	image: theme.homeImage
});

const HomeBackground = ({ classes }) => <div className={classes.image} />;

HomeBackground.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(HomeBackground);
