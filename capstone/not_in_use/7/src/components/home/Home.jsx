//

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import EventAvailable from '@material-ui/icons/EventAvailable';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

/*
verified_user
business
money_off
card_membership
*/

import HomeBackground from './HomeBackground';
import Icon from '../tools/Icon';

import Footer from './Footer';

import { HomeStyles, Intro, Title, Info, Started, Register, Features, Feature, Header, Text } from './HomeStyles';

const Home = ({ classes }) => (
	<main className={classes.outer} role="main">
		<HomeBackground />
		<Intro>
			<Title>Task Management</Title>
			<Info>Your Productivity Tool</Info>
			<Started>
				<Register variant="raised" component={Link} to="/join">
					Join now for free
				</Register>
			</Started>
		</Intro>

		<Features role="contentinfo" itemScope itemType="http://schema.org/Product">
			<Feature>
				<Header>
					<EventAvailable />
					Goals, Project, Tasks
				</Header>
				<Text itemProp="description">Organize and categorize</Text>
			</Feature>
			<Feature>
				<Header>
					<AssignmentTurnedIn />
					Calendar
				</Header>
				<Text itemProp="description">Overview of your events and tasks</Text>
			</Feature>
			<Feature>
				<Header>
					<Icon name="monster" css={classes.icon} />
					Time Tracking
				</Header>
				<Text itemProp="description">
					<span itemProp="name">TaskMuncher</span> tracks time spent on tasks and generates time spent reports
				</Text>
			</Feature>
			<Feature>
				<Header>
					<Icon name="monster" css={classes.icon} />
					Mobile Apps
				</Header>
				<Text itemProp="description">Apps for iPhone, iPad, Android</Text>
			</Feature>
			<Feature>
				<Header>
					<Icon name="monster" css={classes.icon} />
					Time Tracking
				</Header>
				<Text itemProp="description">
					<span itemProp="name">TaskMuncher</span> tracks time spent on tasks and generates time spent reports
				</Text>
			</Feature>
			<Feature>
				<Header>
					<Icon name="monster" css={classes.icon} />
					Mobile Apps
				</Header>
				<Text itemProp="description">Apps for iPhone, iPad, Android</Text>
			</Feature>
		</Features>

		<Footer />
	</main>
);

Home.propTypes = {
	classes: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withStyles(HomeStyles)(Home);
