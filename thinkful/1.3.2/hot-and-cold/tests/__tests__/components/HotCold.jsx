//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { HotCold } from '../../../src/components';

describe('<HotCold />', () => {
	describe('smoke-test', () => {
		it('Renders without crashing', () => {
			shallow(<HotCold />);
		});
	});
});
