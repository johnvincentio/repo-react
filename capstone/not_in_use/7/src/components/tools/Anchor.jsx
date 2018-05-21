//

import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	anchor: {
		color: theme.anchor.main,
		textDecoration: 'none',
		'&:hover': {
			color: theme.anchor.selected,
			cursor: 'pointer'
		}
	}
});

const Anchor = props => (
	<a className={props.classes.anchor} href={props.href}>
		{props.text}
	</a>
);

Anchor.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Anchor);

// function Anchor(props) {
// 	return (
// 		<a className={props.classes.anchor} href={props.href}>
// 			{props.text}
// 		</a>
// 	);
// }
