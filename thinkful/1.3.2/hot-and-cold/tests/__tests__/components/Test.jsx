//

/* global describe, it, jest, expect */

import React from 'react';
import { shallow } from 'enzyme';

describe('Test', () => {
	it('has 3 items', () => {
		const wrapper = shallow(
			<ul>
				<li>item 1</li>
				<li>item 2</li>
			</ul>
		);
		expect(wrapper.find('li')).toHaveLength(2);
	});
});
