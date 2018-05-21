//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';

import LogoIconStyles from './LogoIconStyles';

function LogoIcon(props) {
	return <Icon name="monster" css={props.classes.logo} />;
}

LogoIcon.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(LogoIconStyles, { withTheme: true })(LogoIcon);
