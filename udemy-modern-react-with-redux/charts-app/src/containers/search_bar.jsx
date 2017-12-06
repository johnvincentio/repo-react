
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from '../actions/index';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		event.preventDefault();
		console.log(this.state.term);
		console.log(this.props);
		this.props.actions.fetchWeather(this.state.term);
		this.setState({ term: '' });
	}
	render() {
		return (
			<form className="input-group" onSubmit={this.onFormSubmit}>
				<input
					placeholder="Get a five-day forecast in your favorite cities"
					className="form-control"
					value={this.state.term}
					onChange={this.onInputChange}
				/>
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>
		);
	}
}

// const mapStateToProps = state => ({
// 	books: state.books,
// });

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ fetchWeather }, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchBar);
