import React from "react";

import { Task, Card, Droppable } from "..";

export default props => {
	const { tasks = [], id } = props;
	return (
		<Card>
			<Droppable dndType="TASK" {...props}>
				<h2>{id}</h2>
				{tasks.map(task => (
					<Task key={task.id} dndType="TASK" {...task} />
				))}
			</Droppable>
		</Card>
	);
};



