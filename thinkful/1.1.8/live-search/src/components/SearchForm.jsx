//

import React from 'react';
import PropTypes from 'prop-types';

// <label htmlFor="search">Search</label>&emsp;

export default function SearchForm(props) {
	return (
		<form onSubmit={e => e.preventDefault()}>
			<label htmlFor="search">
				Search
				<input
					aria-controls="character-count"
					type="search"
					id="search"
					name="search"
					placeholder="Dale Cooper"
					value={props.value}
					onChange={e => props.onChange(e.target.value)}
				/>
			</label>&emsp;
		</form>
	);
}

SearchForm.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};
