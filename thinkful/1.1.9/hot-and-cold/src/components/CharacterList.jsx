//

import React from 'react';
import PropTypes from 'prop-types';

export default function CharacterList(props) {
	const characters = props.characters.map((character, index) => (
		<li key={index}>
			<strong>{character.name}</strong> ({character.actor}) - {character.description}
		</li>
	));
	return <ul className="character-list">{characters}</ul>;
}

CharacterList.propTypes = {
	characters: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			actor: PropTypes.string.isRequired
		})
	).isRequired
};
