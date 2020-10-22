//

/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import PokeHeader from '../../src/components/PokeHeader';

describe('<PokeHeader />', () => {
	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<PokeHeader player={1} total={256} winner={false} />);
		});
		it('Renders without crashing', () => {
			shallow(<PokeHeader player={2} total={345} winner />);
		});
	});

	/*
	  const p = wrapper.find('.toggle-todo');
	expect(p.text()).toBe('Buy Milk');
	*/

	describe('content', () => {

		it('Test1', () => {
			const wrapper = shallow(<PokeHeader player={1} total={256} winner={false} />);
			expect(wrapper.find('div').length).toEqual(3);
			expect(wrapper.find('div.pokeheader').length).toEqual(1);
			expect(wrapper.find('div.pokeheader--result').length).toEqual(1);
			expect(wrapper.find('div.pokeheader--total').length).toEqual(1);
		});

		it('Test Player 1 Losing', () => {
			const wrapper = shallow(<PokeHeader player={1} total={367} winner={false} />);
			expect(wrapper.find('div.pokeheader').hasClass('player1')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').hasClass('loser')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').text()).toEqual(`Losing Hand`);
			expect(wrapper.find('div.pokeheader--total').text()).toEqual(`Total Experience: 367`);
		});

		it('Test Player 1 Winning', () => {
			const wrapper = shallow(<PokeHeader player={1} total={462} winner />);
			expect(wrapper.find('div.pokeheader').hasClass('player1')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').hasClass('winner')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').text()).toEqual(`Winning Hand`);
			expect(wrapper.find('div.pokeheader--total').text()).toEqual(`Total Experience: 462`);
		});

		it('Test Player 2 Winning', () => {
			const wrapper = shallow(<PokeHeader player={2} total={399} winner />);
			expect(wrapper.find('div.pokeheader').hasClass('player2')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').hasClass('winner')).toEqual(true);
			expect(wrapper.find('div.pokeheader--result').text()).toEqual(`Winning Hand`);
			expect(wrapper.find('div.pokeheader--total').text()).toEqual(`Total Experience: 399`);
		});
	});

	// describe('properties-state', () => {
	// 	it('Renders property count', () => {
	// 		const count = 12;
	// 		const wrapper = shallow(<Status count={count} />);
	// 		expect(wrapper.contains(<span>{count}</span>)).toEqual(true);
	// 	});
	// });
});
