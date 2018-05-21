//

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TagsIcon from './TagsIcon';

import * as actions from '../../redux/actions';
import { goalsType } from '../../types';

import * as tagUtilities from '../../utilities/tagUtilities';

class TagsList extends React.Component {
	state = { open: false };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		const { goals } = this.props;
		const arr = tagUtilities.uniqueTagsFromGoals(goals);
		const tagLinks = arr.map(tag => (
			<div key={`tag-${tag}`}>
				<ListItem button component={Link} to={`/tag/${tag}`}>
					<ListItemText inset primary={tag} />
				</ListItem>
			</div>
		));

		return (
			<Fragment>
				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<TagsIcon />
					</ListItemIcon>
					<ListItemText inset primary="Tags" />
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{tagLinks}
					</List>
				</Collapse>
			</Fragment>
		);
	}
}

TagsList.propTypes = {
	goals: goalsType.isRequired // eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.user.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);
