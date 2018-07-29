//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

import { Help } from '../../../src/components';

describe('<Help />', () => {
	const toggleHelp = jest.fn();

	it('Renders without crashing', () => {
		shallow(<Help toggleHelp={toggleHelp} />);
	});
	it('Renders classname help', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.hasClass('help')).toEqual(true);
	});
	it('Renders h3', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.find('h3').text()).toEqual('What do I do?');
	});
	it('Renders h3 contains', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.contains(<h3>What do I do?</h3>)).toBeTruthy();
	});

	it('Renders contains ul', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(
			wrapper
				.find('div')
				.find('div')
				.find('p')
		).toHaveLength(2);
	});
	it('Renders contains ul', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.find('p')).toHaveLength(2);
	});

	it('Renders contains ul', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.find('ul')).toHaveLength(1);
	});
	it('Renders contains li', () => {
		const wrapper = shallow(<Help toggleHelp={toggleHelp} />);
		expect(wrapper.find('li')).toHaveLength(3);
	});
});
