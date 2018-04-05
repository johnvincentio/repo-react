
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import ButtonIcon from '../../toolbox/ButtonIcon';
import SidebarRight from './SidebarRight';

import * as actions from '../../actions/';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		// console.log('--- Sidebar::constructor, props ', props);
		this.handleClickMenu = this.handleClickMenu.bind(this);
		this.handleClickDummy = this.handleClickDummy.bind(this);
	}

	handleClickMenu() {
		// event.preventDefault();
		this.props.actions.CloseSidebar();
	}
	handleClickDummy() {	// eslint-disable-line class-methods-use-this
		// event.preventDefault();
	}

	render() {
		// console.log('--- Sidebar::render, props ', this.props);
		const { selected } = this.props;
		return (
			<div className="sidebar-grid">

				<div className="sidebar-grid--top">
					<ButtonIcon
						svgName="cancel"
						cssIcon="close-menu"
						cssButton="sidebar-menu-close"
						onClick={this.handleClickMenu}
					/>
					<div>Search</div>
				</div>

				<div className="sidebar-grid--right" role="menu">
					<SidebarRight selected={selected} />
				</div>
			</div>
		);
	}
}

Sidebar.propTypes = {
	selected: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		CloseSidebar: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Sidebar);

/*
				<div className="sidebar-grid--left">
					<div>
						<Link to="/goals">
							<ButtonIcon
								svgName="goal"
								cssIcon="icon"
								cssButton="button"
								onClick={this.handleClickDummy}
							/>
						</Link>
					</div>
					<div>
						<Link to="/projects">
							<ButtonIcon
								svgName="folder"
								cssIcon="icon"
								cssButton="button"
								onClick={this.handleClickDummy}
							/>
						</Link>
					</div>

					<div>
						<Link to="/tasks">
							<button>Tasks</button>
						</Link>
					</div>
					<div>
						<Link to="/calendar">
							<button>Calendar</button>
						</Link>
					</div>
					<div>
						<Link to="/status">
							<button>Status</button>
						</Link>
					</div>
					<div>
						<Link to="/tags">
							<button>Tags</button>
						</Link>
					</div>

					<div>
						<Link to="/">
							<button>Search</button>
						</Link>
					</div>

					<div>
						<Link to="/">
							<button>Graphs - usage</button>
						</Link>
					</div>

					<div>
						<Link to="/full/tasks">
							<button>Tasks</button>
						</Link>
					</div>
					<div>
						<Link to="/full/status">
							<button>Status</button>
						</Link>
					</div>
					<div>
						<Link to="/full/tags">
							<button>Tags</button>
						</Link>
					</div>

					<div>
						<Link to="/simple/goals">
							<ButtonIcon
								svgName="goal"
								cssIcon="icon"
								cssButton="button"
								onClick={this.handleClickDummy}
							/>
						</Link>
					</div>
					<div>
						<Link to="/simple/projects">
							<ButtonIcon
								svgName="folder"
								cssIcon="icon"
								cssButton="button"
								onClick={this.handleClickDummy}
							/>
						</Link>
					</div>
				</div>
				<div className="sidebar-grid--right" role="menu">
					<SidebarRight selected={selected} />
				</div>
*/
/*
	handleClickGoals() {
		console.log('--- handleClickGoals');
	}

	handleClickProjects() {
		console.log('--- handleClickProjects');
	}
*/
/*
	{/ * <div>
		<ButtonIcon
			svgName="goal"
			cssIcon="icon"
			cssButton="button"
			onClick={this.handleClickGoals}
		/>
	</div> * /}
	{/ * <div>
		<ButtonIcon
			svgName="folder"
			cssIcon="icon"
			cssButton="button"
			onClick={this.handleClickProjects}
		/>
	</div> * /}
	{/ * <div>abc</div>
	<div>def</div> * /}
*/

/*
	renderAllProjects() {
		return this.props.data.goals.map((goal) => {
			console.log('Content::renderAllProjects, goal ', goal);
			return goal.projects.map(project => this.renderProject(project));
		});
		// return this.props.data.tasks.projects.map(project => this.renderProject(project));
	}
*/
/*
	renderProjects() {
		console.log('Sidebar::renderProjects, props ', this.props);
		const jv = this.props.data.goals.map((goal) => {
			console.log('Sidebar::renderProjects, goal ', goal);
			return goal.projects.map((project) => {
				console.log('Sidebar::renderProjects, project ', project);
				return (
					<div key={project.id} >
						<Link to={`/projects/${project.id}`}>
							<button onClick={() => this.onClickSelectGoal(project)}>testing{project.description}</button>
						</Link>
					</div>
				);
			});
		});
		// const jv = this.props.data.projects.map((item) => {
		// 	return (
		// 		<div key={item.id} >
		// 			<Link to={`/projects/${item.id}`}>
		// 				<button onClick={() => this.onClickSelectGoal(item)}>{item.description}</button>
		// 			</Link>
		// 		</div>
		// 	);
		// });
		console.log(jv);
		return jv;
	}
*/
/*
	isNone() {
		return this.props.selected === 'none';
	}
	isGoals() {
		return this.props.selected === 'goals';
	}
	isProjects() {
		return this.props.selected === 'projects';
	}
*/
