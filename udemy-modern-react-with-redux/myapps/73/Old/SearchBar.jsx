//

import React from 'react';
import PropTypes from 'prop-types';

class Car {

	setDriveSound = (sound) => {
		this.sound = sound;
	}

	drive = () => {
		return this.sound;
	}
}

const car = new Car();
car.setDriveSound('woosh');

const { drive } = car;
console.log(`sound is  ${drive()}`);


class SearchBar extends React.Component {
	state = {
		term: ''
	}

	onInputChange(event) {
		console.log('--- onInputChange; ', event.target.value);
	}

	// onFormSubmit(event) {
	// 	console.log('--- onFormSubmit; term ', this.state.term);
	// 	event.preventDefault();
	// }

	onFormSubmit = (event) => {
		console.log('--- onFormSubmit; term ', this.state.term);
		event.preventDefault();
		this.props.onSubmit(this.state.term);
	}


	render() {
		return (
			<div className="ui segment">
				<form className="ui form" onSubmit={this.onFormSubmit}>
					<div className="field">
						<label>Image search</label>
						<input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })} />
					</div>
				</form>
			</div>
		);
	}
}

SearchBar.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
