//

import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import CharacterCount from './CharacterCount';
import CharacterList from './CharacterList';

export default class LiveSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			characters: props.characters,
			search: ''
		};
	}

	setSearch = search => {
		this.setState({ search, characters: this.createList(search) });
	};

	createList(search) {
		if (search && search.length > 0) {
			return this.props.characters.filter(item =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		return this.props.characters;
	}

	render() {
		return (
			<div className="live-search">
				<SearchForm value={this.state.search} onChange={value => this.setSearch(value)} />
				<CharacterCount count={this.state.characters.length} />
				<CharacterList characters={this.state.characters} />
			</div>
		);
	}
}

LiveSearch.propTypes = {
	characters: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			actor: PropTypes.string.isRequired
		})
	).isRequired
};
