//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { GuessForm } from '../../../src/components/GuessForm';

describe('<GuessForm />', () => {
	const answer = 79;
	const victory = false;
	const showAnswer = false;
	const actions = {
		handleGuess: jest.fn(),
		toggleAnswer: jest.fn()
	};

	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
		});
	});

	describe('content', () => {
		it('Renders classname guessForm', () => {
			const wrapper = shallow(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			expect(wrapper.find('form').hasClass('guessForm')).toEqual(true);
			expect(wrapper.find('p').exists()).toBeFalsy();
		});
	});

	describe('properties-state', () => {
		it('Victory found', () => {
			const truth = true;
			const wrapper = shallow(
				<GuessForm answer={answer} victory={truth} showAnswer={showAnswer} actions={actions} />
			);
			expect(wrapper.find('form').exists()).toBeFalsy();
		});

		it('Find the button', () => {
			const wrapper = shallow(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			expect(wrapper.find('button').text()).toEqual('Guess');
		});
	});

	describe('callbacks-events', () => {
		it('Find the button', () => {
			mount(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			expect(actions.handleGuess).not.toHaveBeenCalled();
		});

		it('Fire the button', () => {
			const wrapper = mount(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			const value = 10;
			wrapper.find('input[type="text"]').instance().value = value;
			expect(wrapper.find('button').text()).toEqual('Guess');
			wrapper.find('button').simulate('click');
			expect(actions.handleGuess).toHaveBeenCalled();
			expect(actions.handleGuess).toHaveBeenCalledWith(value);
		});

		it('Should reset input', () => {
			const wrapper = mount(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			const input = wrapper.find('input[type="text"]');
			input.instance().value = 10;
			wrapper.find('button').simulate('click');
			expect(input.instance().value).toEqual('');
		});

		it('Ask for Help', () => {
			const wrapper = mount(
				<GuessForm answer={answer} victory={victory} showAnswer={showAnswer} actions={actions} />
			);
			expect(wrapper.find('p').exists()).toBeFalsy();
			wrapper.find('input[type="text"]').instance().value = '?';
			wrapper.find('button').simulate('click');
			expect(actions.handleGuess).toHaveBeenCalled();
		});
	});
});
