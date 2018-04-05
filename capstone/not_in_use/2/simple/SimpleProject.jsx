
import React from 'react';

import { projectType } from '../../types';
import SimpleTasks from './SimpleTasks';

const SimpleProject = (props) => {
	const { project } = props;
	// console.log('--- SimpleProject, project ', project);
	return (
		<div>
			<br />
			--- {project.description}, {project.comments}, {project.status}
			<SimpleTasks tasks={project.tasks} />
		</div>
	);
};

SimpleProject.propTypes = {
	project: projectType.isRequired,
};

export default SimpleProject;
