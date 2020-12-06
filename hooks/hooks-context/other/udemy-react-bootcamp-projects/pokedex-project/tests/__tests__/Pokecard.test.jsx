//

/* global describe, it, expect, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';

import Pokecard from '../../src/components/Pokecard';

let card = {};

describe('<Pokecard />', () => {
	describe('smoke-test', () => {
		beforeEach(() => {
			card = {id: 7, name: 'Squirtle', type: 'water', baseExperience: 63};
		});

		it('Renders without crashing', () => {
			shallow(<Pokecard player={1} index={2} card={card} winner={false} dealCards={false} />);
		});
		it('Renders without crashing', () => {
			shallow(<Pokecard player={1} index={3} card={card} winner dealCards />);
		});
	});

	describe('content', () => {
		it('Test divs', () => {
			const wrapper = shallow(<Pokecard player={1} index={2} card={card} winner={false} dealCards={false} />);
			expect(wrapper.find('div').length).toEqual(5);
			expect(wrapper.find('div.pokecard').length).toEqual(1);
			expect(wrapper.find('div.pokecard--image').length).toEqual(1);
			expect(wrapper.find('div.pokecard--image').find('img').length).toEqual(1);
			expect(wrapper.find('div.pokecard--name').length).toEqual(1);
			expect(wrapper.find('div.pokecard--type').length).toEqual(1);
			expect(wrapper.find('div.pokecard--exp').length).toEqual(1);
		});
	});

	it('Test classes', () => {
		const wrapper = shallow(<Pokecard player={1} index={2} card={card} winner={false} dealCards={false} />);
		
		expect(wrapper.find('div.pokecard').hasClass('loser')).toEqual(true);
		expect(wrapper.find('div.pokecard').hasClass('deck')).toEqual(true);
		expect(wrapper.find('div.pokecard').hasClass(`C12`)).toEqual(true);

		expect(wrapper.find('div.pokecard--image').find('img').prop('alt')).toEqual(card.name);

		expect(wrapper.find('div.pokecard--name').text()).toEqual(card.name);

		expect(wrapper.find('div.pokecard--type').text()).toEqual(`Type: ${card.type}`);
		expect(wrapper.find('div.pokecard--exp').text()).toEqual(`Exp: ${card.baseExperience}`);
	});

	it('Test classes more', () => {
		const wrapper = shallow(<Pokecard player={2} index={3} card={card} winner dealCards />);
		
		expect(wrapper.find('div.pokecard').hasClass('winner')).toEqual(true);
		expect(wrapper.find('div.pokecard').hasClass('deal')).toEqual(true);
		expect(wrapper.find('div.pokecard').hasClass(`C23`)).toEqual(true);

		expect(wrapper.find('div.pokecard--image').find('img').prop('alt')).toEqual(card.name);

		expect(wrapper.find('div.pokecard--name').text()).toEqual(card.name);

		expect(wrapper.find('div.pokecard--type').text()).toEqual(`Type: ${card.type}`);
		expect(wrapper.find('div.pokecard--exp').text()).toEqual(`Exp: ${card.baseExperience}`);
	});

	it('Test enzyme 1', () => {
		const wrapper = shallow(<Pokecard player={1} index={0} card={card} winner dealCards />);
		const p = wrapper.find('.pokecard--name');
		expect(p.text()).toBe(card.name);
	});

	it('Test enzyme 2', () => {
		const wrapper = shallow(<Pokecard player={1} index={1} card={card} winner dealCards />);
		const p = wrapper.find('.pokecard--name');
		expect(p.contains(card.name)).toEqual(true);
	});

});
