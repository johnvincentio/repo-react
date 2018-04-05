
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/';

class ConfigureGoals extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: '', draggedGoal: '' };
		console.log('--- ConfigureGoals ', props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);

		this.onDrag = this.onDrag.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		console.log('>>> ConfigureGoals; componentDidMount');
		this.props.actions.getUserData();
		console.log('<<< ConfigureGoals; componentDidMount');
	}

	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		console.log('--- ConfigureGoals::onFormSubmit, this.state.term ', this.state.term);
		event.preventDefault();
		console.log(this.state.term);
		console.log(this.props);
		this.props.actions.addGoal(this.state.term);
		this.setState({ term: '' });
	}

	onClickDelete(item) {
		console.log('onClickDelete ', item);
		// if (confirm('Are you sure you want to remove goal ' + item.text + ' from your goals?')) {
		// 	this.props.actions.deleteGoal(item);
		// }
		this.props.actions.deleteGoal(item);
	}

	/* eslint-disable class-methods-use-this */
	onClickEdit(item) {
		console.log('onClickEdit ', item);
	}

	// const { style } = event.currentTarget;
	// style.border = 'solid black';		// Restore source's border
	onDrag(event) {
		// console.log('onDrag ', event);
	}

	onDragStart(event) {
		const { target, dataTransfer } = event;
		console.log('******* onDragStart target ', target);
		target.className = 'goal-dragging';
		this.setState({ draggedGoal: target });
		const dataId = target.getAttribute('data_id');
		dataTransfer.setData('text', dataId);
		dataTransfer.effectAllowed = 'move';
	}

	onDragEnd(event) {
		const { target, dataTransfer } = event;
		console.log('onDragEnd, target ', target);
		this.setState({ draggedGoal: '' });
		target.className = 'goal';
		dataTransfer.clearData();		// Remove all of the drag data
	}


	onDragEnter(event) {
		const { target } = event;
		const draggedGoal = this.state.draggedGoal;
		console.log('******* onDragEnter target ', target, ' draggedGoal ', draggedGoal);
		const dropId = target.getAttribute('data_index') * 1;
		// const dragId = dataTransfer.getData('text');
		const dragId = draggedGoal.getAttribute('data_id') * 1;
		console.log(' dragId ', dragId, ' dropId ', dropId);
		if (dragId === dropId || dragId + 1 === dropId) {
			return;
		}
		target.className = 'goal-dropping';
	}
	onDragOver(event) {
		event.preventDefault();
	}

	onDragLeave(event) {
		console.log('onDragLeave ', event);
	}

	onDrop(event) {
		event.preventDefault();
		const { target, dataTransfer } = event;
		console.log('******* onDrop target ', target, ' dataTransfer ', dataTransfer);
		target.className = 'goal-droppable';
		const dropIndex = target.getAttribute('data_index') * 1;
		const dragged = this.state.draggedGoal;
		const dragIndex = dragged.getAttribute('data_index') * 1;
		// const dragId = dataTransfer.getData('text');
		console.log('dragIndex ', dragIndex, ' dropIndex ', dropIndex);
		this.props.actions.moveGoal(dragIndex, dropIndex);
	}

	render() {
		console.log('render() props ', this.props);
		const lastIndex = this.props.goals.length - 1;
		console.log('lastIndex ', lastIndex);
		const jv = this.props.goals.map((item, idx) => {
			console.log('item ', item);
			const mult = idx * 2;
			const count = [mult + 1, mult + 2];
			console.log('idx ', idx, ' count ', count);
			return (
				<div key={`outer_key_${item.id}`}>
					<div
						className="goal-droppable"
						data_order_id={count[0]}
						data_drop_id={item.id}
						data_index={idx}
						onDragEnter={this.onDragEnter}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
					/>
					<div
						className="goal"
						data_order_id={count[1]}
						data_id={item.id}
						data_index={idx}
						draggable="true"
						onDrag={this.onDrag}
						onDragStart={this.onDragStart}
						onDragEnd={this.onDragEnd}
					>
						<div className="goal-text">{item.text}</div>
						<button onClick={() => this.onClickDelete(item)}>Delete</button>
						<button onClick={() => this.onClickEdit(item)}>Edit</button>
					</div>
				</div>
			);
		});
		console.log(jv);

		return (
			<div className="configureGoals">
				<h2>Goals</h2>
				<p>
				Setting personal goals is a powerful way to direct your energy and determine what you want to achieve in life. Unlike tasks, which have a clear path of action, goals are usually vague and difficult to quantify. Once you define your goals, you can assign them to individual tasks and keep track of your progress. This is a helpful way to see which goals you are progressing on and which goals need more attention.
				</p>

				<div className="goal-container">
					<form onSubmit={this.onFormSubmit}>
						<input
							required
							placeholder="Enter your new Goal"
							value={this.state.term}
							onChange={this.onInputChange}
						/>
						<span>
							<button type="submit" className="submit-button">Add Goal</button>
						</span>
					</form>

					<div className="list-goals">
						{jv}
					</div>
				</div>
			</div>
		);
	}
}

ConfigureGoals.propTypes = {
	actions: PropTypes.shape({
		getUserData: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureGoals);

/*
{ {idx === lastIndex &&
	<div
		className="droppable"
		data_order_id={count[2]}
		data_drop_id="999999"
		data_drop_seq_id="999999"
		onDragEnter={this.onDragEnter}
		onDragOver={this.onDragOver}
		onDragLeave={this.onDragLeave}
		onDrop={this.onDrop}
	/>
} }
*/