import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goalsType } from '../types';

import * as actions from '../actions/';

import Button from '../toolbox/Button';
import TextInput from '../toolbox/TextInput';
import TextArea from '../toolbox/TextArea';

import Tags from '../toolbox/Tags';

class Test2 extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- Test2; constructor, props ', props);
		this.updateGoalTitle = this.updateGoalTitle.bind(this);
		this.updateGoalDescription = this.updateGoalDescription.bind(this);
	}
	// handleClickMenu(event) {
	// 	event.preventDefault();
	// }

	updateGoalTitle(value) {
		console.log('--- updateGoalTitle, value:', value);
		console.log('--- updateGoalTitle, this.props ', this.props);
		const first = this.props.goals[0];
		console.log('first ', first);
		this.props.actions.updateUserGoal(first.id, { field: 'title', value });
	}

	updateGoalDescription(value) {
		console.log('--- updateGoalDescription, value:', value);
		console.log('--- updateGoalDescription, this.props ', this.props);
		const first = this.props.goals[0];
		console.log('first ', first);
		this.props.actions.updateUserGoal(first.id, { field: 'description', value });
	}

	render() {
		const { goals } = this.props;
		const goal = goals[0];
		const project = goal.projects[0];
		const task = project.tasks[2];
		console.log('--- Test2::render, goals ', goals);
		return (
			<div className="test2-container">
				<div className="test2-test">
					<Tags goalId={goal.id} projectId={project.id} task={task} />
				</div>

				<div>
					<TextInput
						id="goal-0-title"
						name="name"
						inputType="text"
						maxLength="10"
						content={goals[0].title}
						title="title"
						placeholder="Enter goal title"
						submit={this.updateGoalTitle}
						required
					/>
				</div>
				<div className="break" />

				<div>
					<TextArea
						id="goal-0-description"
						rows={5}
						resize={false}
						content={goals[0].description}
						name="name"
						submit={this.updateGoalDescription}
						placeholder="Description"
					/>
				</div>
				<div className="break" />

				<Button className="test2--icon" selected={false}>
					Button text
				</Button>
				<div className="break" />

				{/* <div className="svg1">
					<Icon name="greek" />
				</div> */}
				<div>{goals[0].title}</div>
				<div className="break" />

				<div>
					<img id="frontImg" style={{ height: 60, width: 60 }} src="images/plus-black.png" alt="abc" />
				</div>
				<div className="break" />

				<div>
					icon rocket
					<i className="fa fa-rocket" />
				</div>
				<div className="break" />

				<div className="icon2">icon2</div>
				<div className="break" />

				<div>
					<p className="p1">p1 paragraph text</p>
				</div>
				<div className="break" />
				<hr />

				<div>
					<p className="p2">p2 paragraph text</p>
				</div>
				<div className="break" />

				<div>
					<p className="p3">
						Bugs Bunny is <a href="http://krasimirtsonev.com">developer</a>
						who likes to write and <a href="https://twitter.com/KrasimirTsonev">tweet</a>.
					</p>
				</div>
				<div className="break" />

				<div>
					<p className="p4">
						<a href="/test2">Home</a>
						<a href="/test2">Team</a>
						<a href="/test2">Developers</a>
					</p>
				</div>

				<div className="p5">
					<a href="/test2">Home</a>
					<a href="/test2">Products</a>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at purus ac lacus ultrices vehicula.</p>
				</div>
				<hr />
				<div className="p6">
					<p>
						Martin Fowler said
						<span className="quoted">
							Any fool can write code that a computer can understand. Good programmers write code that humans can
							understand.
						</span>
					</p>
				</div>
				<div className="p7">
					<h2>What is CSS?</h2>
					<div className="popup">
						Cascading Style Sheets is a style sheet language used for describing the presentation semantics of a
						document written in a markup language.
					</div>
				</div>
				<div className="break">break</div>
				<div>
					<div id="thirdLevMenu">
						<ul>
							<li className="active">
								<span className="title">Integrated Coastal Watershed Management Plans</span>
								<ul>
									<li>
										<a href="http://design-irwmp3.migcom.com/app_pages/view/7931">
											Russian River Integrated Coastal Watershed Management Plan
										</a>
									</li>
									<li>
										<a
											href="http://design-irwmp3.migcom.com/app_pages/edit/http:/www.goldridgercd.com/watersheds/salmoncreekplan.html"
											target="_blank"
											rel="noopener noreferrer"
										>
											Salmon Creek Coastal Watershed Management Plan
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

Test2.propTypes = {
	goals: goalsType.isRequired, // eslint-disable-line react/no-typos
	actions: PropTypes.shape({
		updateUserGoal: PropTypes.func.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	goals: state.dataReducer.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Test2);
