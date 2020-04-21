//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import Pokecard from './Pokecard';

class Pokedex extends React.Component {

	render() {
		const { hand, total, winner } = this.props;
		return (
			<div className="pokedex">
				<div className={`pokedex--result ${ winner ? "winner" : "loser"}`}>
					{winner ? "Winning Hand" : "Losing Hand"}
				</div>
				<div>Total Experience: {total} </div>
				<div className="pokedex--cards">
					<Pokecard card = {hand[0]} />
					<Pokecard card = {hand[1]} />
					<Pokecard card = {hand[2]} />
					<Pokecard card = {hand[3]} />
				</div>
			</div>
		);
	}
}

export default Pokedex;
