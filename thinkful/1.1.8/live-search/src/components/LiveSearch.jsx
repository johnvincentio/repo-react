import React from 'react';

import SearchForm from './SearchForm';
import CharacterCount from './CharacterCount';
import CharacterList from './CharacterList';

export default function LiveSearch(props) {
	return (
		<div className="live-search">
			<SearchForm />
			<CharacterCount count={props.characters.length} />
			<CharacterList characters={props.characters} />
		</div>
	);
}
