//

/* global describe, it, jest */

import React from 'react';
import { shallow } from 'enzyme';

import { GuessForm } from '../../../src/components';

describe('<GuessForm />', () => {
	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			const handleGuess = jest.fn();
			const answer = 79;
			const victory = false;
			shallow(<GuessForm handleGuess={handleGuess} answer={answer} victory={victory} />);
		});
	});
});
