//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import Pokecard from './Pokecard';

class Pokedex extends React.Component {

	render() {
		const { hand } = this.props;

		return (
			<div className="pokedex">
				<Pokecard card = {hand[0]} />
				<Pokecard card = {hand[1]} />
				<Pokecard card = {hand[2]} />
				<Pokecard card = {hand[3]} />
			</div>
		);
	}
}

export default Pokedex;
