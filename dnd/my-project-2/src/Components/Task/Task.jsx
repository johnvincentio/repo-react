import React from "react";
import { Draggable } from "..";

const taskStyle = {
	backgroundColor: "DeepSkyBlue",
	margin: 0,
	borderStyle: "solid",
	borderWidth: "1px",
	borderColor: "blue"
};

export default props => (
	<Draggable {...props}>
		<p style={taskStyle}>{props.title}</p>
	</Draggable>
);




