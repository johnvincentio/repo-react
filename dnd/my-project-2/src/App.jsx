import React, { PureComponent } from "react";
import { TaskList } from "./Components";

import initialState from "./appInitialState";

class App extends PureComponent {
	// Set initial state
	constructor(props) {
		super(props);
		this.state = initialState;
		this.onDrop = this.onDrop.bind(this);
	}

	// Move task when dropped
	onDrop(item, targetId) {
		this.setState(state => ({
			tasks: [
				...state.tasks.filter(task => task.id !== item.id),
				{ ...item, listId: targetId }
			]
		}));
	}

	// Render each list
	renderLists() {
		const { lists, tasks } = this.state;
		return lists.map(list => (
			<TaskList
				key={list}
				id={list}
				tasks={tasks.filter(t => t.listId === list)}
				onDrop={this.onDrop}
			/>
		));
	}

	// Render App
	render() {
		return (
			<div style={{ display: "flex", minHeight: "200px" }}>
				{this.renderLists()}
			</div>
		);
	}
}

export default App;

