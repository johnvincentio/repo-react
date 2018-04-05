import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AppMain from '../components/main/AppMain';

import {
	GoalsMain,
	AddGoal,
	EditorGoal,
	EditorProjects,
	EditorProject
} from '../components/editor';

import TasksMain from '../components/tasks/TasksMain';

import CalendarMain from '../components/calendar/CalendarMain';

import Test3 from '../components/Test3';

const AppRoutes = () => (
	<Router>
		<Switch>
			{/* <Route exact path="/" component={AppMain} /> */}
			<Route exact path="/" component={AppMain} />

			{/* <Redirect exact from="/" to="/tasks" /> */}
			{/* <Redirect exact from="/" to="/calendar" /> */}

			<Redirect exact from="/calendar" to="/calendar/all" />
			<Route
				path="/calendar/:param"
				render={props => <CalendarMain selected="calendar" {...props} />}
			/>

			<Route path="/goals" render={props => <GoalsMain selected="goals" {...props} />} />
			<Route path="/goal/:goalId" component={EditorGoal} />
			<Route path="/add/goal" render={props => <AddGoal selected="add-goal" {...props} />} />

			<Route path="/projects" component={EditorProjects} />
			<Route path="/project/:projectId" component={EditorProject} />

			<Redirect exact from="/tasks" to="/tasks/scheduled" />
			<Route path="/tasks/:param" render={props => <TasksMain selected="tasks" {...props} />} />

			<Route
				path="/calendar/task/:param"
				render={props => <GoalsMain selected="task" {...props} />}
			/>

			<Route path="/tags" render={props => <TasksMain selected="tags" {...props} />} />
			<Route path="/tag/:param" render={props => <TasksMain selected="tags" {...props} />} />

			<Redirect exact from="/status" to="/status/started" />
			<Route path="/status/:param" render={props => <TasksMain selected="status" {...props} />} />

			<Route path="/test3" component={Test3} />
			{/* <Route path="/test4" component={Test4} /> */}

			<Redirect to="/" />
		</Switch>
	</Router>
);

export default AppRoutes;

/*
{ <Switch>
	<Route exact path="/" component={Test} />
	<Route path="/goals" component={EditorGoals} />
	<Route path="/goal/:goalId" component={EditorGoal} />
	<Route path="/projects" component={EditorProjects} />
	<Route path="/project/:projectId" component={EditorProject} />

	<Redirect exact from="/full/tasks" to="/full/tasks/all" />
	<Route path="/full/tasks/:param" render={props => <TasksMain selected="tasks" {...props} />} />

	<Redirect exact from="/full/status" to="/full/status/all" />
	<Route path="/full/status/:param" render={props => <TasksMain selected="status" {...props} />} />

	<Route path="/full/tags" render={props => <TasksMain selected="tags" {...props} />} />
	<Route path="/full/tag/:param" render={props => <TasksMain selected="tags" {...props} />} />

	<Route path="/simple/goals" component={SimpleContentGoals} />
	<Route path="/simple/goal/:goalId" component={SimpleContentGoal} />
	<Route path="/simple/projects" component={SimpleContentProjects} />
	<Route path="/simple/project/:projectId" component={SimpleContentProject} />

	<Route path="/settings/goals" component={EditorGoals} />

	<Route path="/test" component={Test} />
	<Route path="/test2" component={Test2} />
	<Redirect from="/jv" to="/test" />
	<Redirect to="/" />
</Switch> }
*/
