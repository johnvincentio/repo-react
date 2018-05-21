//

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import GridOnIcon from '@material-ui/icons/GridOn';
import GridOffIcon from '@material-ui/icons/GridOff';
import AddIcon from '@material-ui/icons/Add';

import * as actions from '../../redux/actions/';

import MemberLayout from './MemberLayout';

import { GoalDialog, GoalCard } from '../goals';
import { ListProjects, ListProject } from '../projects';

import { TasksGridViewer, TasksTableViewer } from '../tasks';

import ViewCalendar from '../calendar/ViewCalendar';

import { goalsType, matchType } from '../../types';

import * as goalUtilities from '../../utilities/goalUtilities';
import * as projectUtilities from '../../utilities/projectUtilities';
import * as taskUtilities from '../../utilities/taskUtilities';
import * as tagUtilities from '../../utilities/tagUtilities';

import { tasksListFromGoalsByStatus } from '../../utilities/taskStatusUtilities';
import { transformMomentToObject } from '../../utilities/datesUtilities';

import DesktopMain from './DesktopMain';
import TabletMain from './TabletMain';
import MobileMain from './MobileMain';

import MemberMainStyles from './MemberMainStyles';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

class MemberMain extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- MemberMain::constructor ', props);
		this.state = { draggedElement: '', addGoalDialogOpen: false, gridView: true };
		this.setDraggedElement = this.setDraggedElement.bind(this);
		this.getDraggedElement = this.getDraggedElement.bind(this);

		this.onCalendarEventDrop = this.onCalendarEventDrop.bind(this);
	}

	componentDidMount() {
		// console.log('--- MemberMain::componentDidMount, props ', this.props);
		// this.props.dispatch(userActions.getAll());
	}

	onCalendarEventDrop(event, start, end) {
		// console.log('--- MemberMain::onCalendarEventDrop(), event ', event, ' start ', start, ' end ', end);
		const { goalId, projectId, taskId } = event;

		const startObj = transformMomentToObject(start);
		const endObj = transformMomentToObject(end);
		// console.log('startObj ', startObj, ' endObj ', endObj);

		this.props.actions.updateDatesTask(goalId, projectId, taskId, startObj, endObj);
	}

	getDraggedElement() {
		// console.log('MemberMain::getDraggedElement, this.state.draggedElement', this.state.draggedElement);
		return this.state.draggedElement;
	}
	setDraggedElement(element) {
		// console.log('MemberMain::setDraggedElement, element', element);
		this.setState({ draggedElement: element });
	}

	toggleAddGoalDialog = () => {
		// console.log('MemberMain::toggleAddGoalDialog');
		this.setState({
			addGoalDialogOpen: !this.state.addGoalDialogOpen
		});
	};
	closeAddGoalDialog = () => {
		// console.log('MemberMain::closeAddGoalDialog');
		this.setState({
			addGoalDialogOpen: false
		});
	};

	isAddGoalDialogOpen = () => this.state.addGoalDialogOpen;

	toggleGridView = () => {
		this.setState({
			gridView: !this.state.gridView
		});
	};

	renderAddGoalcon() {
		const { datatype } = this.props;
		const colorButton = this.isAddGoalDialogOpen() ? 'secondary' : 'primary';
		const addGoal = datatype === 'goals' || datatype === 'goal';
		return addGoal ? (
			<Tooltip title="Add Goal" placement="bottom-start" enterDelay={300}>
				<Button mini variant="fab" color={colorButton} aria-label="add" onClick={this.toggleAddGoalDialog}>
					<AddIcon color="inherit" />
				</Button>
			</Tooltip>
		) : (
			''
		);
	}

	renderGridIcon() {
		const { classes, datatype } = this.props;
		const showGridIcon =
			datatype === 'tasks' ||
			datatype === 'status' ||
			datatype === 'tags' ||
			datatype === 'starred' ||
			datatype === 'main';
		if (!showGridIcon) {
			return '';
		}
		return this.state.gridView ? (
			<Tooltip className={classes.right} title="List View" placement="bottom-start" enterDelay={300}>
				<Button mini variant="fab" color="primary" aria-label="list view" onClick={this.toggleGridView}>
					<GridOnIcon color="inherit" />
				</Button>
			</Tooltip>
		) : (
			<Tooltip className={classes.right} title="Grid View" placement="bottom-start" enterDelay={300}>
				<Button mini variant="fab" color="primary" aria-label="grid view" onClick={this.toggleGridView}>
					<GridOffIcon color="inherit" />
				</Button>
			</Tooltip>
		);
	}

	renderGoalsMain() {
		const { classes, goals, datatype } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- MemberMain::renderGoalsMain, datatype ', datatype, ' param ', param);

		const tmpGoals = JSON.parse(JSON.stringify(goals));
		let partialGoals = [];
		switch (datatype) {
			// case 'status':
			// 	partialGoals = taskStatusUtilities.dataFromGoalsByStatus(param, tmpGoals);
			// 	break;
			// case 'tags':
			// case 'tag':
			// 	partialGoals = tagUtilities.dataFromGoalsByTag(param, tmpGoals);
			// 	break;
			// case 'tasks':
			// 	partialGoals = taskUtilities.dataFromGoalsByStatus(param, tmpGoals);
			// 	break;
			case 'task':
				partialGoals = taskUtilities.dataFromGoalsByTaskId(param, tmpGoals);
				break;
			case 'goal':
				partialGoals = goalUtilities.goalFromGoalsById(param, tmpGoals);
				console.log('partialGoals ', partialGoals);
				break;
			case 'goals':
			default:
				partialGoals = tmpGoals;
		}

		let div = '';
		switch (datatype) {
			case 'goal':
				div = (
					<GoalCard
						goal={partialGoals}
						idx={0}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				);
				break;
			case 'goals':
			case 'task':
			default:
				div = partialGoals.map((item, idx) => (
					<GoalCard
						key={`goal_key_${item.goalid}`}
						goal={item}
						idx={idx}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				));
		}
		return <Paper className={classes.container}>{div}</Paper>;
	}

	renderProjectsMain() {
		const { classes, goals, datatype } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- MemberMain::renderGoalsMain, datatype ', datatype, ' param ', param);

		let div = '';
		if (datatype === 'projects') {
			div = goals.map(goal => (
				<Fragment key={`goal-${goal.goalid}`}>
					<ListProjects
						goalId={goal.goalid}
						projects={goal.projects}
						getDraggedElement={this.getDraggedElement}
						setDraggedElement={this.setDraggedElement}
					/>
				</Fragment>
			));
		} else if (datatype === 'project') {
			const goal = goalUtilities.goalFromGoalsByProjectId(param * 1, goals);
			// console.log('ProjectsMain::render(), goal ', goal);

			const project = projectUtilities.projectFromGoalsById(param * 1, goals);
			// console.log('ProjectsMain::render(), project ', project);
			div = (
				<ListProject
					key={`project_key_${goal.goal.goalid}_${project.projectid}`}
					goalId={goal.goal.goalid}
					project={project}
					idx={0}
					getDraggedElement={this.getDraggedElement}
					setDraggedElement={this.setDraggedElement}
				/>
			);
		}
		return <Paper className={classes.container}>{div}</Paper>;
	}

	renderMain() {
		return (
			<Fragment>
				<Desktop>
					{this.state.gridView ? (
						<DesktopMain text="DesktopMain isGrid" goals={this.props.goals} />
					) : (
						<DesktopMain text="DesktopMain not IsGrid" goals={this.props.goals} />
					)}
				</Desktop>
				<Tablet>
					{this.state.gridView ? (
						<TabletMain text="TabletMain isGrid" goals={this.props.goals} />
					) : (
						<TabletMain text="TabletMain not IsGrid" goals={this.props.goals} />
					)}
				</Tablet>
				<Mobile>
					{this.state.gridView ? (
						<MobileMain text="MobileMain isGrid" goals={this.props.goals} />
					) : (
						<MobileMain text="MobileMain not IsGrid" goals={this.props.goals} />
					)}
				</Mobile>
			</Fragment>
		);
	}

	renderTasks() {
		const { goals, datatype } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- MemberMain::renderTasks, datatype ', datatype, ' param ', param);
		let tasksList = [];
		switch (datatype) {
			case 'status':
				tasksList = tasksListFromGoalsByStatus(param, goals);
				break;
			case 'tags':
			case 'tag':
				tasksList = tagUtilities.tagsListFromGoalsByTag(param, goals);
				break;
			case 'starred':
				tasksList = taskUtilities.starredTasksListFromGoals(goals);
				break;
			case 'tasks':
			default:
				tasksList = taskUtilities.tasksListFromGoals(param, goals);
		}
		const div = this.state.gridView ? (
			<TasksGridViewer
				tasksList={tasksList}
				getDraggedElement={this.getDraggedElement}
				setDraggedElement={this.setDraggedElement}
			/>
		) : (
			<TasksTableViewer
				tasksList={tasksList}
				getDraggedElement={this.getDraggedElement}
				setDraggedElement={this.setDraggedElement}
			/>
		);

		return div;
	}

	renderCalendar() {
		const { goals } = this.props;
		const { param } = this.props.match.params;
		// console.log('--- MemberMain::render, param ', param);
		const events = taskUtilities.eventsListFromGoals(param, goals);
		// console.log('--- MemberMain::render, events ', events);
		return <ViewCalendar events={events} onEventDrop={this.onCalendarEventDrop} />;
	}

	render() {
		// console.log('--- MemberMain::render, this.props ', this.props);
		const { classes, datatype } = this.props;

		const addGoalDiv = this.renderAddGoalcon();
		const gridDiv = this.renderGridIcon();

		let mainDiv = '';
		switch (datatype) {
			case 'calendar':
				mainDiv = this.renderCalendar();
				break;
			case 'tasks':
			case 'status':
			case 'tags':
			case 'tag':
			case 'starred':
				mainDiv = this.renderTasks();
				break;
			case 'main':
				mainDiv = this.renderMain();
				break;
			case 'projects':
			case 'project':
				mainDiv = this.renderProjectsMain();
				break;
			case 'goal':
			case 'goals':
			case 'task':
				mainDiv = this.renderGoalsMain();
				break;
			default:
		}

		return (
			<MemberLayout>
				<div className={classes.mainHeader}>
					{addGoalDiv}
					{gridDiv}
				</div>
				{this.isAddGoalDialogOpen() ? <GoalDialog close={this.closeAddGoalDialog} /> : ''}
				{mainDiv}
			</MemberLayout>
		);
	}
}

MemberMain.propTypes = {
	classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	match: matchType.isRequired, // eslint-disable-line react/no-typos
	datatype: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		updateDatesTask: PropTypes.func.isRequired
	}).isRequired
	// dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	console.log('memberMain::mapStateToProps, state ', state);
	return { goals: state.user.goals };
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default compose(withStyles(MemberMainStyles), connect(mapStateToProps, mapDispatchToProps))(MemberMain);
