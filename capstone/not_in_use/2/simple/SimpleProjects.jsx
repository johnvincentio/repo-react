
import React from 'react';

import { projectsType } from '../../types';
import SimpleProject from './SimpleProject';

const SimpleProjects = (props) => {
	const { projects } = props;
	// console.log('--- SimpleProjects, projects ', projects);
	const div = projects.map(project => (
		<div key={`project-${project.id}`} >
			<SimpleProject project={project} />
		</div>
	));
	return (
		<div>
			{ div }
		</div>
	);
};

SimpleProjects.propTypes = {
	projects: projectsType.isRequired,
};

export default SimpleProjects;

