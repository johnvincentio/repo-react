//

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Styles, Container, Anchor } from './FooterStyles';

const Footer = props => {
	const { classes } = props;
	const year = 1900 + new Date().getYear();
	return (
		<Container>
			<Button className={classes.button} component={Link} to="/terms-of-service">
				Terms of Service
			</Button>
			<Button classes={{ root: classes.button }} component={Link} to="/privacy-policy">
				Privacy Policy
			</Button>
			<Button classes={{ root: classes.button }} component={Link} to="/contact">
				Contact
			</Button>
			<Button classes={{ root: classes.button }}>
				<Anchor href="https://www.taskmuncher.com" target="_blank">
					&copy; {year} Taskmuncher
				</Anchor>
			</Button>
		</Container>
	);
};

Footer.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(Styles)(Footer);
