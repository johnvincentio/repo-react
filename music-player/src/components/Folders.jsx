//

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	FormControl,
	Input,
	InputLabel,
	InputAdornment,
	IconButton,
	Divider
} from '@material-ui/core';

// import { treeType, foldersType } from '../types';

import * as actions from '../redux/actions';

import Outer from '../containers/Outer';
import Inner from '../containers/Inner';

class Folders extends React.Component {
	state = {
		folder: 1,
		track: null
	};

	componentDidMount() {
		console.log('--- Folders::componentDidMount');
		this.props.actions.getMusicData();
	}

	renderList() {
		console.log('Folders::renderList(); props ', this.props);
	}

	render() {
		console.log('Folders::render(); props ', this.props);
		return (
			<Outer>
				<Inner>
					<Button variant="contained" color="primary">
						Hello World
					</Button>
				</Inner>
			</Outer>
		);
	}
}

Folders.propTypes = {
	// widgets: widgetsType.isRequired,
	tree: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	folders: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	actions: PropTypes.shape({
		getMusicData: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	console.log('Folders::mapStateToProps(), state ', state);
	return {
		tree: state.data.tree,
		folders: state.data.folders
	};
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Folders);
