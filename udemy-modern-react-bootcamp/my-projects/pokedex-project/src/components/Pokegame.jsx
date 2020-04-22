//

import React from 'react';

import PokeHeader from './PokeHeader';
import Pokecard from './Pokecard';

import { dataType } from '../types';

import { shuffleArray } from '../utilities/utils';

class Pokegame extends React.Component {
	constructor(props) {
		super(props);
		this.enableCards = this.enableCards.bind(this);

		this.state = {
			dealCards: false,
		};
		this.timer = setTimeout(this.enableCards, 400);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	
	enableCards() {
		this.setState({dealCards: true});
	}

	render() {
		const { data } = this.props;
		shuffleArray(data);
		const hand1 = data.slice(0, 4);
		const total1 = hand1.reduce((sum, item) => sum + item.baseExperience, 0);
		const hand2 = data.slice(4, 8);
		const total2 = hand2.reduce((sum, item) => sum + item.baseExperience, 0);
		return (
			<section className="pokegame">
				<PokeHeader 
					player={1}
					total={total1}
					winner={total1 >= total2}
				/>
				<div>
					{hand1.map((item, index) => (
						<Pokecard
							key={item.id}
							player={1}
							index={index}
							card={item}
							winner={total1 >= total2}
							dealCards={this.state.dealCards}
						/>
					))}
					<PokeHeader 
						player={2}
						total={total2}
						winner={total2 > total1}
					/>
					<div>
						{hand2.map((item, index) => (
							<Pokecard
								key={item.id}
								player={2}
								index={index}
								card={item}
								winner={total2 > total1}
								dealCards={this.state.dealCards}
							/>
						))}
					</div>
				</div>
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
