//

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import Pokedex from './Pokedex';

import { dataType } from '../types';

import { shuffleArray } from '../utilities/utils';

class Pokegame extends React.Component {

	render() {
		const { data } = this.props;
		shuffleArray(data);
		const hand1 = [data[0], data[1], data[2], data[3]];
		const total1 = hand1.reduce((sum, item) => sum + item.baseExperience, 0);
		const hand2 = [data[4], data[5], data[6], data[7]];
		const total2 = hand2.reduce((sum, item) => sum + item.baseExperience, 0);
		return (
			<section className='Pokegame'>
				<Pokedex hand={hand1} total={total1} winner={total1 >= total2} />
				<Pokedex hand={hand2} total={total2} winner={total2 > total1} />
			</section>
		);
	}
}

Pokegame.defaultProps = {
	data: [
		{id: 4, name: 'Charmander', type: 'fire', baseExperience: 62},
		{id: 7, name: 'Squirtle', type: 'water', baseExperience: 63},
		{id: 11, name: 'Metapod', type: 'bug', baseExperience: 72},
		{id: 12, name: 'Butterfree', type: 'flying', baseExperience: 178},
		{id: 25, name: 'Pikachu', type: 'electric', baseExperience: 112},
		{id: 39, name: 'Jigglypuff', type: 'normal', baseExperience: 95},
		{id: 94, name: 'Gengar', type: 'poison', baseExperience: 225},
		{id: 133, name: 'Eevee', type: 'normal', baseExperience: 65}
	]
}

Pokegame.propTypes = {
	data: dataType
};

export default Pokegame;
