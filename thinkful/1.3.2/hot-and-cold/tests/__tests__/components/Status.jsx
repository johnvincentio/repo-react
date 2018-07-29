//

/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Status } from '../../../src/components';

describe('<Status />', () => {
	it('Renders without crashing', () => {
		shallow(<Status count={5} />);
	});
	it('Renders classname status', () => {
		const wrapper = shallow(<Status count={5} />);
		expect(wrapper.hasClass('status')).toEqual(true);
	});
	it('Renders classname content', () => {
		const count = 12;
		const wrapper = shallow(<Status count={count} />);
		expect(wrapper.contains(<span>{count}</span>)).toEqual(true);
	});
});
