
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';

const SidebarRoutes = () => {
	// console.log('--- SidebarRoutes');
	return (
		<Switch>
			<Route exact path="/" render={props => <Sidebar selected="none" {...props} />} />

			<Route path="/calendar" render={props => <Sidebar selected="calendar" {...props} />} />

			<Route path="/goals" render={props => <Sidebar selected="goals" {...props} />} />
			<Route path="/goal/:goalId" render={props => <Sidebar selected="goal" {...props} />} />
			<Route path="/add/goal" render={props => <Sidebar selected="add-goal" {...props} />} />

			<Route path="/projects" render={props => <Sidebar selected="projects" {...props} />} />
			<Route path="/project/:projectId" render={props => <Sidebar selected="project" {...props} />} />

			<Route path="/tasks" render={props => <Sidebar selected="tasks" {...props} />} />

			<Route path="/status" render={props => <Sidebar selected="status" {...props} />} />

			<Route path="/tags" render={props => <Sidebar selected="tags" {...props} />} />
			<Route path="/tag/:tagId" render={props => <Sidebar selected="tag" {...props} />} />
		</Switch>
	);
};

export default SidebarRoutes;

/*
<Route path="/full/tasks" render={props => <Sidebar selected="full-tasks" {...props} />} />
<Route path="/full/status" render={props => <Sidebar selected="full-status" {...props} />} />

<Route path="/full/tags" render={props => <Sidebar selected="full-tags" {...props} />} />
<Route path="/full/tag/:tagId" render={props => <Sidebar selected="full-tag" {...props} />} />

<Route path="/simple/goals" render={props => <Sidebar selected="simple-goals" {...props} />} />
<Route path="/simple/goal/:goalId" render={props => <Sidebar selected="simple-goal" {...props} />} />
<Route path="/simple/projects" render={props => <Sidebar selected="simple-projects" {...props} />} />
<Route path="/simple/project/:projectId" render={props => <Sidebar selected="simple-project" {...props} />} />

<Route path="/test" render={props => <Sidebar selected="none" {...props} />} />
*/
